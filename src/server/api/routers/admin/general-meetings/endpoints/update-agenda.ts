import { eq } from "drizzle-orm"
import * as z from "zod"
import { TRPCError } from "@trpc/server"

import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings } from "~/server/db/schema"

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const updateMeetingAgenda = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7(),
      agenda: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { meetingId, agenda } = input

    const [meeting] = await ctx.db
      .update(generalMeetings)
      .set({ agenda })
      .where(eq(generalMeetings.id, meetingId))
      .returning()

    if (!meeting) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update agenda" })
    }
  })

export default updateMeetingAgenda
