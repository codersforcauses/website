import { Ratelimit } from "@upstash/ratelimit"
import { desc } from "drizzle-orm"

import { publicRatedProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getPublic = publicRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
  const projectList = await ctx.db.query.Project.findMany({
    where: (project, { eq }) => eq(project.is_public, true),

    orderBy: [desc(Project.createdAt), desc(Project.id)],
  })

  return projectList
})
