import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { and, arrayContains, eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure, publicRatedProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getProjectByName = publicRatedProcedure(Ratelimit.fixedWindow(60, "30s"))
  .input(z.object({ name: z.string().min(1) }))
  .query(async ({ input, ctx }) => {
    const projectData = await ctx.db.query.Project.findFirst({
      columns: {
        logo_path: true,
        img_path: true,
        name: true,
        client: true,
        type: true,
        start_date: true,
        end_date: true,
        github_url: true,
        website_url: true,
        description: true,
        impact: true,
        members: true,
        tech: true,
        is_application_open: true,
        application_url: true,
        is_public: true,
      },
      where: and(eq(Project.name, input.name), eq(Project.is_public, true)),
    })

    if (!projectData) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
    }

    return projectData
  })

export const getProjectByUser = protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s"))
  .input(z.object({ user: z.string() }))
  .query(async ({ input, ctx }) => {
    const projectData = await ctx.db.query.Project.findMany({
      columns: {
        logo_path: true,
        img_path: true,
        name: true,
        client: true,
        type: true,
        start_date: true,
        end_date: true,
        github_url: true,
        website_url: true,
        description: true,
        impact: true,
        members: true,
        tech: true,
        is_application_open: true,
        application_url: true,
        is_public: true,
      },
      where: input.user ? arrayContains(Project.members, [input.user]) : undefined,
    })

    return projectData
  })

export const getProjectByUserName = protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s"))
  .input(z.object({ user: z.string(), name: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    const conditions = [
      input.user ? arrayContains(Project.members, [input.user]) : undefined,
      input.name ? eq(Project.name, input.name) : undefined,
    ].filter(Boolean) // remove undefined

    const projectData = await ctx.db.query.Project.findMany({
      columns: {
        logo_path: true,
        img_path: true,
        name: true,
        client: true,
        type: true,
        start_date: true,
        end_date: true,
        github_url: true,
        website_url: true,
        description: true,
        impact: true,
        members: true,
        tech: true,
        is_application_open: true,
        application_url: true,
        is_public: true,
      },
      where: conditions.length > 1 ? and(...conditions) : conditions[0],
    })

    return projectData
  })
