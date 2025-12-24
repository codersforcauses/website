import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { positions } from "~/server/db/schema"

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const createPositions = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7(),
      positions: z.array(
        z.object({
          title: z
            .string()
            .min(1, "Position title is required")
            .max(64, "Position title must be less than 64 characters"),
          openings: z.number().min(1, "There must be at least one opening for this position"),
          description: z.string().max(128, "Position description must be less than 128 characters").optional(),
          priority: z.number(),
        }),
      ),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const data = input.positions.map((position) => ({
      ...position,
      meetingId: input.meetingId,
    }))

    await ctx.db.insert(positions).values(data)
  })

export default createPositions
