import { clerkClient } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"
import { db } from "~/server/db"

export const updateEmail = adminProcedure
  .input(z.object({ userId: z.string(), oldEmail: z.string().email(), newEmail: z.string().email() }))
  .mutation(async ({ ctx, input }) => {
    // TODO: check if old email is the same as the user's email in db

    // TODO: wrap in a transaction
    const [user] = await ctx.db.update(User).set({ email: input.newEmail }).where(eq(User.id, input.userId)).returning()
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: `User with id: ${input.userId} does not exist` })
    }

    const clerkUser = await clerkClient().users.getUser(user.clerk_id)
    if (!clerkUser.primaryEmailAddressId)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Clerk user with id: ${input.userId} does not have a primary email address???`,
      })

    if (clerkUser.primaryEmailAddress?.emailAddress !== input.oldEmail)
      throw new TRPCError({ code: "BAD_REQUEST", message: "Old email does not match" })
    try {
      await updateDbUserEmail(clerkUser.id, clerkUser.primaryEmailAddressId, input.newEmail)
    } catch (err) {
      console.error(err)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update email" })
    }

    return user
  })

const updateDbUserEmail = async (userId: string, oldEmailAddressId: string, newEmailAddress: string) => {
  const res = await clerkClient().emailAddresses.createEmailAddress({
    userId,
    emailAddress: newEmailAddress,
    verified: true,
    primary: true,
  })
  await db.update(User).set({ email: res.emailAddress }).where(eq(User.id, userId))
  await clerkClient().emailAddresses.deleteEmailAddress(oldEmailAddressId) // cleanup
}
