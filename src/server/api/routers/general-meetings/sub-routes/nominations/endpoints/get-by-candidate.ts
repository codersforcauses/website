import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { nominations } from "~/server/db/schema"

const getNominationsByCandidate = publicRatedProcedure()
  .input(z.object({ candidateId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.select().from(nominations).where(eq(nominations.candidateId, input.candidateId))
  })

export default getNominationsByCandidate
