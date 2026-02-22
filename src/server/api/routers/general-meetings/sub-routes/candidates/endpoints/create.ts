import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { candidates } from "~/server/db/schema"

/**
 * Registers the current user as a candidate in a general meeting
 * @param {string} meetingId - The ID of the meeting to register as a candidate for
 * @returns {Promise<Object>} - The created candidate record
 * @throws {TRPCError} - If user is not authenticated
 */
const createCandidate = protectedRatedProcedure()
  .input(z.object({ meetingId: z.uuidv7() }))
  .mutation(async ({ ctx, input }) => {
    const [candidate] = await ctx.db
      .insert(candidates)
      .values({
        userId: ctx.session.user.id,
        meetingId: input.meetingId,
      })
      .returning()

    return candidate
  })

export default createCandidate
