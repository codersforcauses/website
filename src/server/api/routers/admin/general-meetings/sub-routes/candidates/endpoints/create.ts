import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { answers, candidates, nominations } from "~/server/db/schema"

/**
 * Creates a new general meeting
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning general meeting details
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const createCandidates = adminProcedure
  .input(
    z.object({
      userId: z.uuidv7().min(1, "User ID is required"),
      meetingId: z.uuidv7().min(1, "Meeting ID is required"),
      positions: z.array(z.uuidv7()).min(1, "At least one position must be selected"),
      answers: z.record(z.uuidv7(), z.xor([z.string(), z.boolean()])),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    await ctx.db.transaction(async (tx) => {
      const [candidate] = await tx
        .insert(candidates)
        .values({
          meetingId: input.meetingId,
          userId: input.userId,
        })
        .returning()

      if (!candidate?.id) {
        tx.rollback()
        return
      }

      await Promise.all([
        tx.insert(nominations).values(
          input.positions.map((pos) => ({
            candidateId: candidate.id,
            positionId: pos,
            meetingId: input.meetingId,
          })),
        ),
        tx.insert(answers).values(
          Object.entries(input.answers).map(([qid, ans]) => ({
            candidateId: candidate.id,
            questionId: qid,
            text: typeof ans === "boolean" ? `bool:${ans}` : ans,
          })),
        ),
      ])
    })
  })

export default createCandidates
