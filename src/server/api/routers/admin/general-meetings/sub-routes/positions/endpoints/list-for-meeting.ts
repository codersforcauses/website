import { TRPCError } from "@trpc/server"
import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Creates positions for meeting
 * @param {string} - id of the meeting
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const listPositionsForMeeting = adminProcedure.input(z.uuidv7()).query(async ({ ctx, input }) => {
  const pos = await ctx.db.query.positions.findMany({
    columns: {
      meetingId: false,
      createdAt: false,
      updatedAt: false,
    },
    where: {
      meetingId: input,
    },
    orderBy: {
      priority: "asc",
    },
  })

  if (!pos)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve positions",
    })

  return pos
})

export default listPositionsForMeeting
