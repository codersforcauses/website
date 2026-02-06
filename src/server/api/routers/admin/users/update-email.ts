import { clerkClient } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { Project, User } from "~/server/db/schema"

// deprecated, only for admin to update user email
// users should use the updateEmail procedure in users router to update their own email
export const updateEmail = adminProcedure
  .input(z.object({ userId: z.string(), oldEmail: z.string().email(), newEmail: z.string().email() }))
  .mutation(async ({ ctx, input }) => {
    const clerk = await clerkClient()
    const user_data = await ctx.db.query.User.findFirst({
      where: eq(User.email, input.oldEmail),
    })

    if (!user_data) {
      throw new TRPCError({ code: "NOT_FOUND", message: `User with email: ${input.oldEmail} does not exist` })
    }

    const user_email_data = await ctx.db.query.User.findFirst({
      where: eq(User.email, input.newEmail),
    })

    if (user_email_data) {
      throw new TRPCError({ code: "FORBIDDEN", message: `User with email: ${input.newEmail} already exist` })
    }

    const user = await ctx.db.query.User.findFirst({
      where: eq(User.id, input.userId),
    })

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: `User with id: ${input.userId} does not exist` })
    }

    const clerkUser = await clerk.users.getUser(user.clerk_id)
    if (!clerkUser.primaryEmailAddressId)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Clerk user with id: ${input.userId} does not have a primary email address???`,
      })

    // Clerk will always return the lowercased email from its API
    if (clerkUser.primaryEmailAddress?.emailAddress !== input.oldEmail.toLowerCase())
      throw new TRPCError({ code: "BAD_REQUEST", message: "Old email does not match" })
    try {
      await updateClerkUserEmail(clerkUser.id, clerkUser.primaryEmailAddressId, input.newEmail)
      await ctx.db.update(User).set({ email: input.newEmail }).where(eq(User.id, input.userId))
    } catch (err) {
      console.error(err)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update email" })
    }
    await ctx.db
      .update(Project)
      .set({
        members: sql`array_replace(${Project.members}, ${input.oldEmail}, ${input.newEmail})`,
      })
      .where(sql`${input.oldEmail} = ANY(${Project.members})`)

    return user
  })

const updateClerkUserEmail = async (userId: string, oldEmailAddressId: string, newEmailAddress: string) => {
  const clerk = await clerkClient()
  await clerk.emailAddresses.createEmailAddress({
    userId,
    emailAddress: newEmailAddress,
    verified: true,
    primary: true,
  })
  await clerk.emailAddresses.deleteEmailAddress(oldEmailAddressId)
}
