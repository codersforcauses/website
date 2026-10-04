import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Creates questions for meeting
 * @param {string} - id of the meeting
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const listQuestionsForMeeting = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7().min(1, "Meeting ID is required"),
    }),
  )
  .query(async ({ ctx, input }) => {
    // TODO: filter winners
    const data = await ctx.db.query.candidates.findMany({
      columns: { id: true },
      with: {
        user: {
          columns: {
            id: true,
            image: true,
            name: true,
            preferredName: true,
            studentNumber: true,
            role: true,
          },
        },
        positions: {
          columns: { id: true },
          orderBy: {
            priority: "asc",
          },
        },
        answers: {
          columns: {
            questionId: true,
            text: true,
          },
        },
      },
      where: {
        meetingId: input.meetingId,
      },
    })

    return data
  })

export default listQuestionsForMeeting
