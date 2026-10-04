import { eq } from "drizzle-orm"
import * as z from "zod"
import { TRPCError } from "@trpc/server"

import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings } from "~/server/db/schema"
import { MEETING_STATUS } from "~/lib/constants"

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const updateMeetingStatus = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7(),
      status: z.enum(MEETING_STATUS),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { meetingId, status } = input

    const [meeting] = await ctx.db
      .update(generalMeetings)
      .set({
        status,
      })
      .where(eq(generalMeetings.id, meetingId))
      .returning()

    if (!meeting) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update meeting" })
    }
  })

export default updateMeetingStatus
