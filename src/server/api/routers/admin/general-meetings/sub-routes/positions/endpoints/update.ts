import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { positions } from "~/server/db/schema"

/**
 * Updates a position in a general meeting
 * @param {string} id - The ID of the position to update
 * @throws {TRPCError} - If user is not an admin or the position is not found
 */
const updatePosition = adminProcedure
  .input(
    z.object({
      id: z.uuidv7(),
      title: z.string().min(1).max(64).optional(),
      description: z.string().max(128).optional(),
      openings: z.number().min(1).optional(),
      priority: z.number().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, ...data } = input

    const [updated] = await ctx.db.update(positions).set(data).where(eq(positions.id, id)).returning()

    if (!updated) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Position not found" })
    }

    return updated
  })

export default updatePosition
