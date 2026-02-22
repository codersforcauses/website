import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { questions } from "~/server/db/schema"

/**
 * Deletes a question from a general meeting
 * @param {string} id - The ID of the question to delete
 * @throws {TRPCError} - If user is not an admin or the question is not found
 */
const deleteQuestion = adminProcedure.input(z.object({ id: z.uuidv7() })).mutation(async ({ ctx, input }) => {
  const [deleted] = await ctx.db.delete(questions).where(eq(questions.id, input.id)).returning()

  if (!deleted) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Question not found" })
  }
})

export default deleteQuestion
