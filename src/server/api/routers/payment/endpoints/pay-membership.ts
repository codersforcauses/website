import { randomUUID } from "node:crypto"
import { Ratelimit } from "@upstash/ratelimit"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import type { Money } from "square"
import z from "zod"

import { squareClient } from "~/lib/square.server"
import { protectedRatedProcedure } from "~/server/api/trpc"
import { payments, users } from "~/server/db/schema"
import { env } from "~/env"

/**
 * CFC membership payment
 * @returns {Promise<Object>} - Minimal data about user's saved cards
 */
const payMembership = protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
  .input(
    z.string().min(2, {
      message: "Square source ID is required",
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const currentUser = ctx.session.user
    const label = `Coders for Causes Membership ${new Date().getFullYear()}`
    const membership = {
      currency: "AUD",
      amount: BigInt(500), // 5 AUD in cents. TODO: create amount table
    }
    const { payment, errors } = await squareClient.payments.create({
      idempotencyKey: randomUUID(),
      locationId: env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
      sourceId: input,
      customerId: currentUser.squareCustomerId ?? undefined,
      referenceId: currentUser.id,
      statementDescriptionIdentifier: label,
      note: `Payment for ${label} by ${currentUser.name}`,
      amountMoney: membership as Money,
    })

    if (errors || !payment?.amountMoney || !Object.keys(payment?.amountMoney).length) {
      console.error("Error creating payment for user", currentUser, errors)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create payment",
      })
    }

    await Promise.all([
      ctx.db.insert(payments).values({
        userId: currentUser.id,
        label: label,
        amount: membership.amount,
        currency: membership.currency,
      }),
      ctx.db.update(users).set({ role: "member" }).where(eq(users.id, currentUser.id)),
    ])

    return payment.id
  })

export default payMembership
