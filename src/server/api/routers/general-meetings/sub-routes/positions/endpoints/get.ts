import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"

/**
 * Returns all positions for a given general meeting
 * @param {string} meetingId - The ID of the meeting to retrieve positions for
 * @returns {Promise<Object[]>} - Array of positions for the meeting
 */
const getPositions = publicRatedProcedure()
  .input(z.object({ meetingId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.query.positions.findMany({
      where: { meetingId: input.meetingId },
      orderBy: { priority: "asc" },
    })
  })

export default getPositions
