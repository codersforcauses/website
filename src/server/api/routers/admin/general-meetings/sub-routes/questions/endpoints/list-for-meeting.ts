import { TRPCError } from "@trpc/server"
import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Creates questions for meeting
 * @param {string} - id of the meeting
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const listQuestionsForMeeting = adminProcedure.input(z.uuidv7()).query(async ({ ctx, input }) => {
  const ques = await ctx.db.query.questions.findMany({
    columns: {
      meetingId: false,
    },
    where: {
      meetingId: input,
    },
    orderBy: {
      order: "asc",
    },
  })

  if (!ques)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve questions",
    })

  return ques
})

export default listQuestionsForMeeting
