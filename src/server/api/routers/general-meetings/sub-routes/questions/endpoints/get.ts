import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"

/**
 * Returns all questions for a given general meeting
 * @param {string} meetingId - The ID of the meeting to retrieve questions for
 * @returns {Promise<Object[]>} - Array of questions for the meeting ordered by position
 */
const getQuestions = publicRatedProcedure()
  .input(z.object({ meetingId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.query.questions.findMany({
      where: { meetingId: input.meetingId },
      orderBy: { order: "asc" },
    })
  })

export default getQuestions
