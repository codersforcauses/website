import { asc, count, eq } from "drizzle-orm"
import { getTableColumns } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { nominations, positions } from "~/server/db/schema"

/**
 * Returns all positions for a meeting with the number of nominees for each
 * @param {string} meetingId - The ID of the meeting
 * @returns {Promise<Object[]>} - Array of positions with nomineeCount
 */
const getPositionsWithCounts = publicRatedProcedure()
  .input(z.object({ meetingId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db
      .select({
        ...getTableColumns(positions),
        nomineeCount: count(nominations.candidateId),
      })
      .from(positions)
      .leftJoin(nominations, eq(nominations.positionId, positions.id))
      .where(eq(positions.meetingId, input.meetingId))
      .groupBy(positions.id)
      .orderBy(asc(positions.priority))
  })

export default getPositionsWithCounts
