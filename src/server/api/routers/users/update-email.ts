import { clerkClient } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const updateEmail = protectedRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
  .input(z.object({ userId: z.string(), oldEmail: z.string().email(), newEmail: z.string().email() }))
  .mutation(async ({ ctx, input }) => {
    const currentUser = ctx.user
    const clerk = await clerkClient()
    if (currentUser?.id !== input.userId) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You can only update your own email" })
    }

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

    const updateClerkUserEmail = async (oldEmailAddressId: string, newEmailAddress: string) => {
      const clerk = await clerkClient()
      // TODO: cannot update
      const nonPrimaryEmail = clerkUser.emailAddresses.find((e) => e.emailAddress == input.newEmail.toLowerCase())
      if (nonPrimaryEmail) {
        await clerk.users.updateUser(user.clerk_id, {
          primaryEmailAddressID: nonPrimaryEmail.id,
        })
        // TODO: delete social account(for sso)
        await clerk.emailAddresses.deleteEmailAddress(oldEmailAddressId)
      }
    }
    // Clerk will always return the lowercased email from its API
    if (clerkUser.primaryEmailAddress?.emailAddress !== input.oldEmail.toLowerCase())
      throw new TRPCError({ code: "BAD_REQUEST", message: "Old email does not match" })
    try {
      await updateClerkUserEmail(clerkUser.primaryEmailAddressId, input.newEmail)
      await ctx.db.update(User).set({ email: input.newEmail }).where(eq(User.id, input.userId))
    } catch (err) {
      console.error(err)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update email" })
    }

    return user
  })
