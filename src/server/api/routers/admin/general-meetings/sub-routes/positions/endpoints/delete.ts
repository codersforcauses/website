import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { positions } from "~/server/db/schema"

/**
 * Deletes a position from a general meeting
 * @param {string} id - The ID of the position to delete
 * @throws {TRPCError} - If user is not an admin or the position is not found
 */
const deletePosition = adminProcedure.input(z.object({ id: z.uuidv7() })).mutation(async ({ ctx, input }) => {
  const [deleted] = await ctx.db.delete(positions).where(eq(positions.id, input.id)).returning()

  if (!deleted) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Position not found" })
  }
})

export default deletePosition
