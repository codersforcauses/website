import { desc } from "drizzle-orm"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getProjects = adminProcedure
  .input(
    z.object({
      name: z.string().optional(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { name } = input
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
        id: true,
      },
      where: name ? eq(Project.name, name) : undefined,

      orderBy: [desc(Project.created_at), desc(Project.id)],
    })

    return projectList
  })

export const getPublicProjects = adminProcedure
  .input(
    z.object({
      is_public: z.boolean(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { is_public } = input
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
        id: true,
      },
      where: eq(Project.is_public, is_public),

      orderBy: [desc(Project.created_at), desc(Project.id)],
    })

    return projectList
  })
