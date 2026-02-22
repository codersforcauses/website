import { TRPCError } from "@trpc/server"
import { eq, getTableColumns, inArray } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { answers, candidates, nominations, users } from "~/server/db/schema"

/**
 * Returns all candidates for a position along with their answers and the meeting's questions
 * @param {string} positionId - The ID of the position
 * @returns {Promise<Object>} - Position, questions, and candidates with answers
 */
const getCandidatesForPosition = publicRatedProcedure()
  .input(z.object({ positionId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    const position = await ctx.db.query.positions.findFirst({
      where: { id: input.positionId },
    })

    if (!position) throw new TRPCError({ code: "NOT_FOUND", message: "Position not found" })

    const positionNominations = await ctx.db
      .select()
      .from(nominations)
      .where(eq(nominations.positionId, input.positionId))

    if (positionNominations.length === 0) {
      return { position, questions: [], candidates: [] }
    }

    const candidateIds = positionNominations.map((n) => n.candidateId)

    const [candidateRows, allAnswers, meetingQuestions] = await Promise.all([
      ctx.db
        .select({
          ...getTableColumns(candidates),
          userName: users.name,
          userPreferredName: users.preferredName,
          userImage: users.image,
          userPronouns: users.pronouns,
        })
        .from(candidates)
        .leftJoin(users, eq(candidates.userId, users.id))
        .where(inArray(candidates.id, candidateIds)),
      ctx.db.select().from(answers).where(inArray(answers.candidateId, candidateIds)),
      ctx.db.query.questions.findMany({
        where: { meetingId: position.meetingId },
        orderBy: { order: "asc" },
      }),
    ])

    return {
      position,
      questions: meetingQuestions,
      candidates: candidateRows.map((candidate) => ({
        ...candidate,
        answers: allAnswers.filter((a) => a.candidateId === candidate.id),
      })),
    }
  })

export default getCandidatesForPosition
