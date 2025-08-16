import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
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
      where: eq(Project.name, input.name),
    })

    if (!projectData) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
    }

    return projectData
  })
