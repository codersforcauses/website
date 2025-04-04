import { Ratelimit } from "@upstash/ratelimit"
import { randomUUID } from "crypto"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { squareClient } from "~/server/services/square"

export const storeCard = protectedRatedProcedure(Ratelimit.fixedWindow(2, "30s"))
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
    const { result } = await squareClient.cardsApi.createCard({
      idempotencyKey: randomUUID(),
      sourceId: input.sourceID,
      // verificationToken: input.verificationToken,
      card: {
        customerId: currentUser?.square_customer_id,
        referenceId: currentUser.id,
      },
    })
    return result.card?.id
  })
