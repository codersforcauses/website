import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { createQuestions as create } from "../../util/create"

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const createQuestions = adminProcedure
  .input(
    z.object({
      meetingId: z.uuidv7(),
      questions: z.array(
        z.object({
          text: z
            .string()
            .min(1, "Question title is required")
            .max(128, "Question title must be less than 256 characters"),
          type: z.enum(["short", "long", "checkbox"]).default("short"),
          required: z.boolean().default(false),
          order: z.number(),
        }),
      ),
    }),
  )
  .mutation(async ({ input }) => {
    return await create(input)
  })

export default createQuestions
