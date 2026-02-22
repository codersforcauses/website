import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { nominations } from "~/server/db/schema"

/**
 * Returns all nominations for a given position
 * @param {string} positionId - The ID of the position to retrieve nominations for
 * @returns {Promise<Object[]>} - Array of nominations for the position
 */
const getNominations = publicRatedProcedure()
  .input(z.object({ positionId: z.uuidv7() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.select().from(nominations).where(eq(nominations.positionId, input.positionId))
  })

export default getNominations
