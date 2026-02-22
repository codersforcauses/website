import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { nominations } from "~/server/db/schema"

/**
 * Creates a nomination linking a candidate to a position in a general meeting
 * @param {string} meetingId - The ID of the meeting
 * @param {string} positionId - The ID of the position being nominated for
 * @param {string} candidateId - The ID of the candidate being nominated
 * @returns {Promise<void>}
 * @throws {TRPCError} - If user is not authenticated
 */
const createNomination = protectedRatedProcedure()
  .input(
    z.object({
      meetingId: z.uuidv7(),
      positionId: z.uuidv7(),
      candidateId: z.uuidv7(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.db.insert(nominations).values({
      candidateId: input.candidateId,
      positionId: input.positionId,
      meetingId: input.meetingId,
    })
  })

export default createNomination
