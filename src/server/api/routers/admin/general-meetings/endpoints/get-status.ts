import { TRPCError } from "@trpc/server"
import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Get meeting agenda with slug
 * @param {string} - unique slug for meeting
 * @returns {Promise<Object>} - Object returning general meeting
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const getMeetingStatus = adminProcedure
  .input(z.uuidv7().min(1, "General meeting ID is required"))
  .query(async ({ ctx, input }) => {
    const meeting = await ctx.db.query.generalMeetings.findFirst({
      columns: {
        status: true,
      },
      where: {
        id: input,
      },
    })
    if (!meeting)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find meeting from ID",
      })
    return meeting.status
  })

export default getMeetingStatus
