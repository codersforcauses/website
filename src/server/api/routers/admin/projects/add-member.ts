import { TRPCError } from "@trpc/server"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project, ProjectMember, User } from "~/server/db/schema"

export const createMember = adminProcedure
  .input(
    z.object({
      project_name: z
        .string()
        .min(2, {
          message: "Name is required",
        })
        .trim(),
      user_emails: z.array(z.string()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const project_data = await ctx.db.query.Project.findFirst({
      where: eq(Project.name, input.project_name),
    })
    if (!project_data) throw new Error("Project name not found")
    const userIds = await Promise.all(
      input.user_emails.map(async (email) => {
        const user_data = await ctx.db.query.User.findFirst({
          where: eq(User.email, email),
        })
        if (!user_data) throw new Error(`User not found: ${email}`)

        const member_data = await ctx.db.query.ProjectMember.findFirst({
          where: and(eq(ProjectMember.project_id, project_data.id), eq(ProjectMember.user_id, user_data.id)),
        })
        if (!member_data) return user_data.id
      }),
    )

    const members = await ctx.db
      .insert(ProjectMember)
      .values(userIds.map((id) => ({ user_id: id, project_id: project_data.id })))

    return members
  })
