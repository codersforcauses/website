import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"
import { env } from "process"
import { z } from "zod"
import { Payment, User } from "~/server/db/schema"
import { protectedRatedProcedure } from "~/server/api/trpc"
import { squareClient } from "~/server/services/square"

export const pay = protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
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
    const { result } = await squareClient.paymentsApi.createPayment({
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

    await ctx.db.insert(Payment).values({
      user_id: currentUser.id,
      label: input.label,
      amount: result.payment.amountMoney.amount,
      currency: result.payment.amountMoney.currency,
    })

    await ctx.db.update(User).set({ role: "member" }).where(eq(User.id, currentUser.id))

    return result.payment.id
  })
