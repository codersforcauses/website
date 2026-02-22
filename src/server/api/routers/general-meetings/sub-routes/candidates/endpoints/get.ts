import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { candidates } from "~/server/db/schema"

/**
 * Returns all candidates for a given general meeting
 * @param {string} meetingId - The ID of the meeting to retrieve candidates for
 * @returns {Promise<Object[]>} - Array of candidates for the meeting
 */
const getCandidates = publicRatedProcedure()
  .input(z.object({ meetingId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.select().from(candidates).where(eq(candidates.meetingId, input.meetingId))
  })

export default getCandidates
