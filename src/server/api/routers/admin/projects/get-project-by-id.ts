import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { F } from "node_modules/@upstash/redis/zmscore-07021e27"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project, ProjectMember, User } from "~/server/db/schema"

export const getProjectById = adminProcedure
  .input(z.object({ id: z.string().min(1) }))
  .query(async ({ input, ctx }) => {
    const projectData = await ctx.db.query.Project.findFirst({
      columns: {
        icon: false,
        logo_path: true,
        img_path: true,
        name: true,
        client: true,
        type: true,
        start_date: true,
        end_date: true,
        website_url: true,
        github_url: true,
        impact: true,
        description: true,
        tech: true,
        is_application_open: true,
        application_url: true,
        is_public: true,
        id: true,
      },
      where: eq(Project.id, input.id),
    })

    if (!projectData) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" })
    }
    const memberData = await ctx.db
      .select({
        userId: ProjectMember.user_id,
        userEmail: User.email,
      })
      .from(ProjectMember)
      .leftJoin(User, eq(ProjectMember.user_id, User.id))
      .where(eq(ProjectMember.project_id, input.id))

    const projectWithMembers = {
      ...projectData,
      members: memberData,
    }

    return projectWithMembers
  })
