import { desc } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getAllProjects = adminProcedure.query(async ({ ctx }) => {
  const projectList = await ctx.db.query.Project.findMany({
    orderBy: [desc(Project.createdAt), desc(Project.id)],
  })

  return projectList
})
