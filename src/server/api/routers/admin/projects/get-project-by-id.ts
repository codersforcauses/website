import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getProjectById = adminProcedure
  .input(z.object({ id: z.string().min(1) }))
  .query(async ({ input, ctx }) => {
    const projectData = await ctx.db.select({}).from(Project).where(eq(Project.id, input.id))

    if (projectData.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
    }

    return projectData
  })
