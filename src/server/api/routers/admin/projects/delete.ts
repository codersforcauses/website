// src/server/api/admin/projects.ts
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const deleteProject = adminProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input }) => {
  const existing = await ctx.db.query.Project.findFirst({
    where: eq(Project.name, input.name),
  })

  if (!existing) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Project with name ${input.name} not found`,
    })
  }

  await ctx.db.delete(Project).where(eq(Project.name, input.name))

  return { success: true, deletedName: input.name }
})
