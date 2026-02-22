import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { candidates } from "~/server/db/schema"

/**
 * Deletes a candidate record. Only the user who owns the candidate record may delete it.
 * @param {string} id - The ID of the candidate to delete
 * @throws {TRPCError} - If user is not authenticated, does not own the candidate, or the candidate is not found
 */
const deleteCandidate = protectedRatedProcedure()
  .input(z.object({ id: z.uuidv7() }))
  .mutation(async ({ ctx, input }) => {
    const [candidate] = await ctx.db.select().from(candidates).where(eq(candidates.id, input.id))

    if (!candidate) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Candidate not found" })
    }

    if (candidate.userId !== ctx.session.user.id) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to delete this candidate" })
    }

    await ctx.db.delete(candidates).where(eq(candidates.id, input.id))
  })

export default deleteCandidate
