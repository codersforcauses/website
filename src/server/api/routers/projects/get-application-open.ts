import { Ratelimit } from "@upstash/ratelimit"
import { desc } from "drizzle-orm"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getApplicationOpen = protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
  const projectList = await ctx.db.query.Project.findMany({
    where: (project, { eq }) => eq(project.is_application_open, true),
    orderBy: [desc(Project.created_at), desc(Project.id)],
  })

  return projectList
})
