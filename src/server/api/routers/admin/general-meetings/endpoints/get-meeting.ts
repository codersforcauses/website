import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Get meetings with slug
 * @param {string} - unique slug for meeting
 * @returns {Promise<Object>} - Object returning general meeting
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const getMeeting = adminProcedure
  .input(z.string().min(1, "General meeting slug is required"))
  .query(async ({ ctx, input }) => {
    return await ctx.db.query.generalMeetings.findFirst({
      columns: {
        agenda: false,
      },
      where: {
        slug: input,
      },
    })
  })

export default getMeeting
