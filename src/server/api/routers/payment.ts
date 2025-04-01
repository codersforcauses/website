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
      const currentUser = ctx.user

      // TODO: validate already paid or have role

      // TODO: wrap this in a transaction
      const { result } = await paymentsApi.createPayment({
        idempotencyKey: randomUUID(),
        locationId: env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        sourceId: input.sourceID,
        customerId: currentUser?.square_customer_id,
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
        user_id: currentUser.id,
        label: input.label,
        amount: result.payment.amountMoney.amount,
        currency: result.payment.amountMoney.currency,
      })

      await ctx.db.update(users).set({ role: "member" }).where(eq(users.id, currentUser.id))

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
      const currentUser = ctx.user
      const { result } = await cardsApi.createCard({
        idempotencyKey: randomUUID(),
        sourceId: input.sourceID,
        // verificationToken: input.verificationToken,
        card: {
          customerId: currentUser?.square_customer_id,
          referenceId: currentUser.id,
        },
      })
      return result.card?.id
    }),

  getCards: protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
    const currentUser = ctx.user
    const { result } = await cardsApi.listCards(undefined, currentUser?.square_customer_id)

    return result.cards?.map((card) => ({
      id: card.id ?? "",
      number: `**** **** **** ${card.last4}`,
      brand: card.cardBrand,
      expiry: `${Number(card.expMonth)}/${Number(card.expYear)}`,
    }))
  }),
})
