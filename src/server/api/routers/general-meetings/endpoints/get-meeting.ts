import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"

/**
 * Returns a single general meeting by slug
 * @param {string} slug - The slug of the meeting to retrieve
 * @returns {Promise<Object>} - The matching general meeting
 * @throws {TRPCError} - If no meeting is found with the given slug
 */
const getMeeting = publicRatedProcedure()
  .input(z.object({ slug: z.string() }))
  .query(async ({ ctx, input }) => {
    const meeting = await ctx.db.query.generalMeetings.findFirst({
      where: { slug: input.slug },
    })

    if (!meeting) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
    }

    return meeting
  })

export default getMeeting
