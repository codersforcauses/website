import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { candidates } from "~/server/db/schema"

const getCandidateByUser = protectedRatedProcedure()
  .input(z.object({ meetingId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    const [candidate] = await ctx.db
      .select()
      .from(candidates)
      .where(and(eq(candidates.meetingId, input.meetingId), eq(candidates.userId, ctx.session.user.id)))
    return candidate ?? null
  })

export default getCandidateByUser
