import { Ratelimit } from "@upstash/ratelimit"
import { desc } from "drizzle-orm"

import { publicRatedProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getPublic = publicRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
  const projectList = await ctx.db.query.Project.findMany({
    columns: {
      logo_path: true,
      name: true,
      client: true,
      id: true,
    },
    where: (project, { eq }) => eq(project.is_public, true),

    orderBy: [desc(Project.created_at), desc(Project.id)],
  })

  return projectList
})
