import { desc } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getProjects = adminProcedure.query(async ({ ctx }) => {
  const projectList = await ctx.db.query.Project.findMany({
    columns: {
      icon: false,
      logo_path: true,
      img_path: false,
      name: true,
      client: false,
      type: false,
      start_date: false,
      end_date: false,
      website_url: false,
      github_url: false,
      impact: false,
      description: false,
      tech: false,
      is_application_open: false,
      application_url: false,
      is_public: true,
    },

    orderBy: [desc(Project.createdAt), desc(Project.id)],
  })

  return projectList
})
