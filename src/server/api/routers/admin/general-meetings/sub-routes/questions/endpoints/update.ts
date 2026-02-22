import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { questions } from "~/server/db/schema"

/**
 * Updates a question in a general meeting
 * @param {string} id - The ID of the question to update
 * @throws {TRPCError} - If user is not an admin or the question is not found
 */
const updateQuestion = adminProcedure
  .input(
    z.object({
      id: z.uuidv7(),
      text: z.string().min(1).max(128).optional(),
      type: z.enum(["short", "long", "checkbox"]).optional(),
      required: z.boolean().optional(),
      order: z.number().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, ...data } = input

    const [updated] = await ctx.db.update(questions).set(data).where(eq(questions.id, id)).returning()

    if (!updated) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Question not found" })
    }

    return updated
  })

export default updateQuestion
