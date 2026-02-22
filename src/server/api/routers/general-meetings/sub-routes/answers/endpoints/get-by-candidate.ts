import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { answers } from "~/server/db/schema"

const getAnswersByCandidate = publicRatedProcedure()
  .input(z.object({ candidateId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.select().from(answers).where(eq(answers.candidateId, input.candidateId))
  })

export default getAnswersByCandidate
