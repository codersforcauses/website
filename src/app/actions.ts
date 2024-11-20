"use server"

import { clerkClient } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"

// ! Do not call without the proper permission checks
export const updateEmail = async (userId: string, oldEmailAddressId: string, newEmailAddress: string) => {
  const res = await clerkClient.emailAddresses.createEmailAddress({
    userId,
    emailAddress: newEmailAddress,
    verified: true, // TODO: set to false and send verification email
    primary: true,
  })
  await db.update(users).set({ email: res.emailAddress }).where(eq(users.id, userId))
  await clerkClient.emailAddresses.deleteEmailAddress(oldEmailAddressId) // cleanup
}
