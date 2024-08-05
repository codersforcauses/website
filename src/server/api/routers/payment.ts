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
          currency: input.currency,
          amount: BigInt(parseFloat(input.amount) * 100),
        },
      })
      await ctx.db.insert(payments).values({
        user_id: ctx.user.id,
        label: input.label,
        amount: input.amount,
        currency: input.currency,
      })
      return result.payment?.id
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

  // ! FIXME -- there might be some weird rerender issue that I can't be bothered to fix
  getCards: protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
    const [user] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
    const { result } = await cardsApi.listCards(undefined, user?.square_customer_id)
    if (result.cards?.length === 0) return []
    return result.cards?.map((card) => ({
      id: card.id ?? "",
      number: `**** **** **** ${card.last4}`,
      brand: card.cardBrand,
      expiry: `${Number(card.expMonth)}/${Number(card.expYear)}`,
    }))
  }),
})
