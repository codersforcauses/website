import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { answers, candidates } from "~/server/db/schema"

/**
 * Updates an answer. Only the user who owns the candidate record may update their answer.
 * @param {string} id - The ID of the answer to update
 * @param {string} text - The updated answer text
 * @returns {Promise<Object>} - The updated answer record
 * @throws {TRPCError} - If user is not authenticated, does not own the answer, or the answer is not found
 */
const updateAnswer = protectedRatedProcedure()
  .input(
    z.object({
      id: z.uuidv7(),
      text: z.string().min(1),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select({ candidateUserId: candidates.userId })
      .from(answers)
      .innerJoin(candidates, eq(answers.candidateId, candidates.id))
      .where(eq(answers.id, input.id))

    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Answer not found" })
    }

    if (row.candidateUserId !== ctx.session.user.id) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to update this answer" })
    }

    const [updated] = await ctx.db.update(answers).set({ text: input.text }).where(eq(answers.id, input.id)).returning()

    return updated
  })

export default updateAnswer
