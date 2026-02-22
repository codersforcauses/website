import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { answers, candidates } from "~/server/db/schema"

/**
 * Deletes an answer. Only the user who owns the candidate record may delete their answer.
 * @param {string} id - The ID of the answer to delete
 * @throws {TRPCError} - If user is not authenticated, does not own the answer, or the answer is not found
 */
const deleteAnswer = protectedRatedProcedure()
  .input(z.object({ id: z.uuidv7() }))
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
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to delete this answer" })
    }

    await ctx.db.delete(answers).where(eq(answers.id, input.id))
  })

export default deleteAnswer
