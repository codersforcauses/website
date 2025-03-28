import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { Client, Environment } from "square"
import { randomUUID } from "crypto"

import { createTRPCRouter, protectedRatedProcedure } from "~/server/api/trpc"
import { payments, users } from "~/server/db/schema"
import { env } from "~/env"

const { cardsApi, paymentsApi } = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox") ? Environment.Sandbox : Environment.Production,
})

export const paymentRouter = createTRPCRouter({
  cash: protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
    .input(
      z.string().min(2, {
        message: "Password in required",
      }),
    )
    .mutation(({ input }) => {
      if (input === env.CASH_PASSWORD) {
        return "Cash payment successful"
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid password",
        })
      }
    }),

  pay: protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
    .input(
      z.object({
        sourceID: z.string().min(2, {
          message: "Square source ID is required",
        }),
        label: z.string().min(2, {
          message: "Payment label is required",
        }),
        // TODO: Remove this. Currently exists so frontend doesn't break
        amount: z.string().min(2, {
          message: "Amount is required",
        }),
        currency: z.string().default("AUD"),
        // verificationToken: z
        //   .string()
        //   .min(2, {
        //     message: "Square verification token is required",
        //   })
        //   .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [user] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))

      const { result } = await paymentsApi.createPayment({
        idempotencyKey: randomUUID(),
        locationId: env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        sourceId: input.sourceID,
        customerId: user?.square_customer_id,
        referenceId: ctx.user.id,
        statementDescriptionIdentifier: input.label,
        note: `Payment for ${input.label}`,
        amountMoney: {
          // TODO: fix
          currency: "AUD",
          amount: BigInt(500),
        },
      })

      if (result.errors) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment",
          cause: result.errors,
        })
      }

      if (!result.payment?.amountMoney?.amount) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment",
        })
      }

      await ctx.db.insert(payments).values({
        user_id: ctx.user.id,
        label: input.label,
        amount: result.payment.amountMoney.amount.toString(),
        currency: result.payment.amountMoney.currency,
      })

      // TODO: just update the user role here instead of calling updateRole afterwards
      return result.payment.id
    }),

  storeCard: protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
    .input(
      z.object({
        sourceID: z.string().min(2, {
          message: "Square source ID is required",
        }),
        // verificationToken: z.string().min(2, {
        //   message: "Square verification token is required",
        // }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [user] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
      const { result } = await cardsApi.createCard({
        idempotencyKey: randomUUID(),
        sourceId: input.sourceID,
        // verificationToken: input.verificationToken,
        card: {
          customerId: user?.square_customer_id,
          referenceId: ctx.user.id,
        },
      })
      return result.card?.id
    }),

  getCards: protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
    const [user] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
    const { result } = await cardsApi.listCards(undefined, user?.square_customer_id)

    return result.cards?.map((card) => ({
      id: card.id ?? "",
      number: `**** **** **** ${card.last4}`,
      brand: card.cardBrand,
      expiry: `${Number(card.expMonth)}/${Number(card.expYear)}`,
    }))
  }),
})
