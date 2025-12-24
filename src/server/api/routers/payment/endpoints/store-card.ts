import { randomUUID } from "node:crypto"
import { Ratelimit } from "@upstash/ratelimit"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { squareClient } from "~/lib/square.server"
import { TRPCError } from "@trpc/server"

/**
 * Stores a card for a user in Square
 * @param {string} input - User ID
 * @returns {Promise<string>} - Card ID or created card
 * @throws {TRPCError} - If user does not exist or if the user is not found
 */
const get = protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
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
    const { card, errors } = await squareClient.cards.create({
      idempotencyKey: randomUUID(),
      sourceId: input.sourceID,
      card: {
        customerId: ctx.session.user.squareCustomerId,
        referenceId: ctx.session.user.id,
      },
    })
    if (errors || !card) {
      console.error("Error storing card for user", ctx.session.user, errors)
      throw new TRPCError({
        code: "BAD_GATEWAY",
      })
    }
    return card.id
  })

export default get
