import { TRPCError } from "@trpc/server"
import { and, eq, inArray } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project, ProjectMember, User } from "~/server/db/schema"

export const updateMember = adminProcedure
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
    //TODO:wrapped in transaction
    const project_data = await ctx.db.query.Project.findFirst({
      where: eq(Project.name, input.project_name),
    })
    if (!project_data) throw new Error("Project name not found")
    const existingMembers = await ctx.db.query.ProjectMember.findMany({
      where: eq(ProjectMember.project_id, project_data.id),
    })
    const existingUserIds = new Set(existingMembers.map((m) => m.user_id))
    const incomingUserIds = await Promise.all(
      input.user_emails.map(async (email) => {
        const user_data = await ctx.db.query.User.findFirst({
          where: eq(User.email, email),
        })
        if (!user_data) throw new Error(`User not found: ${email}`)
        return user_data.id
      }),
    )
    const toAdd = incomingUserIds.filter((id) => id && !existingUserIds.has(id))
    const toRemove = existingMembers.filter(
      (member): member is typeof member & { user_id: string } =>
        member.user_id !== null && !incomingUserIds.includes(member.user_id),
    )
    if (toAdd.length) {
      await ctx.db.insert(ProjectMember).values(
        toAdd.map((id) => ({
          user_id: id,
          project_id: project_data.id,
        })),
      )
    }

    if (toRemove.length) {
      await ctx.db.delete(ProjectMember).where(
        and(
          eq(ProjectMember.project_id, project_data.id),
          inArray(
            ProjectMember.user_id,
            toRemove.map((m) => m.user_id),
          ),
        ),
      )
    }
    const updatedMembers = await ctx.db.query.ProjectMember.findMany({
      where: eq(ProjectMember.project_id, project_data.id),
    })
    return { message: updatedMembers }
  })
