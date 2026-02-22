import { TRPCError } from "@trpc/server"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { candidates, nominations } from "~/server/db/schema"

/**
 * Deletes a nomination. Only the user who owns the candidate record may delete their nomination.
 * @param {string} candidateId - The ID of the candidate
 * @param {string} positionId - The ID of the position
 * @throws {TRPCError} - If user is not authenticated, does not own the candidate, or the nomination is not found
 */
const deleteNomination = protectedRatedProcedure()
  .input(
    z.object({
      candidateId: z.uuidv7(),
      positionId: z.uuidv7(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const [candidate] = await ctx.db.select().from(candidates).where(eq(candidates.id, input.candidateId))

    if (!candidate) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Candidate not found" })
    }

    if (candidate.userId !== ctx.session.user.id) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to delete this nomination" })
    }

    const [deleted] = await ctx.db
      .delete(nominations)
      .where(and(eq(nominations.candidateId, input.candidateId), eq(nominations.positionId, input.positionId)))
      .returning()

    if (!deleted) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Nomination not found" })
    }
  })

export default deleteNomination
