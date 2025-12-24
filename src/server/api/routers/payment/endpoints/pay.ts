import { randomUUID } from "node:crypto"
import { Ratelimit } from "@upstash/ratelimit"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import type { Money } from "square"
import z from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { squareClient } from "~/lib/square.server"
import { env } from "~/env"
import { payments } from "~/server/db/schema"

/**
 * Payment using Square
 * @returns {Promise<Object>} - Minimal data about user's saved cards
 */
const pay = protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
  .input(
    z.object({
      sourceID: z.string().min(2, {
        message: "Square source ID is required",
      }),
      label: z.string().min(2, {
        message: "Payment label is required",
      }),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const currentUser = ctx.session.user

    const { payment, errors } = await squareClient.payments.create({
      idempotencyKey: randomUUID(),
      locationId: env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
      sourceId: input.sourceID,
      customerId: currentUser.squareCustomerId ?? undefined,
      referenceId: currentUser.id,
      statementDescriptionIdentifier: input.label,
      note: `Payment for ${input.label} by ${currentUser.name}`,
      amountMoney: {
        currency: "AUD",
        amount: BigInt(500), // 5 AUD in cents. TODO: create amount table
      },
    })

    // if (errors || !payment?.amountMoney || !Object.keys(payment?.amountMoney).length) {
    //   console.error("Error creating payment for user", currentUser, errors)
    //   throw new TRPCError({
    //     code: "INTERNAL_SERVER_ERROR",
    //     message: "Failed to create payment",
    //   })
    // }

    // await ctx.db.insert(payments).values({
    //   userId: currentUser.id,
    //   label: input.label,
    //   amount: membership.amount,
    //   currency: membership.currency,
    // })

    return payment.id
  })

export default pay
