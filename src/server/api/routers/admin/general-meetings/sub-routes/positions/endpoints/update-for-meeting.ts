import { eq } from "drizzle-orm"
import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { positions } from "~/server/db/schema"
import { createPositions as create } from "../../util/create"

/**
 * Updates positions for meeting
 * @param {Object} - Object with keys "meetingId" and "positions"
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const updatePositionsForMeeting = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7(),
      positions: z.array(
        z.object({
          id: z.uuidv7().optional(),
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
    console.log(input)

    // await ctx.db.delete(positions).where(eq(positions.meetingId, input.meetingId))
    // return await create(input)
  })

export default updatePositionsForMeeting
