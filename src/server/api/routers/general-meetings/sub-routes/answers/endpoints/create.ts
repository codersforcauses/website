import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { answers, candidates } from "~/server/db/schema"

/**
 * Creates an answer to a question for a candidate in a general meeting.
 * Only the user who owns the candidate record may submit answers.
 * @param {string} candidateId - The ID of the candidate submitting the answer
 * @param {string} questionId - The ID of the question being answered
 * @param {string} text - The answer text
 * @returns {Promise<Object>} - The created answer record
 * @throws {TRPCError} - If user is not authenticated or does not own the candidate
 */
const createAnswer = protectedRatedProcedure()
  .input(
    z.object({
      candidateId: z.uuidv7(),
      questionId: z.uuidv7(),
      text: z.string().min(1),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const [candidate] = await ctx.db.select().from(candidates).where(eq(candidates.id, input.candidateId))

    if (!candidate) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Candidate not found" })
    }

    if (candidate.userId !== ctx.session.user.id) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to submit this answer" })
    }

    const [answer] = await ctx.db
      .insert(answers)
      .values({
        candidateId: input.candidateId,
        questionId: input.questionId,
        text: input.text,
      })
      .returning()

    return answer
  })

export default createAnswer
