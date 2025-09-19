import { clerkClient } from "@clerk/nextjs/server"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const update = protectedRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
  .input(
    z.object({
      name: z
        .string()
        .min(2, {
          message: "Name is required",
        })
        .optional(),
      preferred_name: z
        .string()
        .min(2, {
          message: "Preferred name is required",
        })
        .optional(),
      pronouns: z
        .string()
        .min(2, {
          message: "Pronouns are required",
        })
        .optional(),
      student_number: z.string().nullish(),
      uni: z.string().optional().nullish(),
      github: z.string().optional().nullish(),
      discord: z.string().optional().nullish(),
      subscribe: z.boolean(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const currentUser = ctx.user
    if (!currentUser) throw new Error("Not authenticated")
    // TODO: update clerk email
    // TODO: Wrap in a transaction
    try {
      const clerk = await clerkClient()
      await clerk.users.updateUser(currentUser.clerk_id, {
        firstName: input.name,
        unsafeMetadata: {
          preferred_name: input.preferred_name,
          pronouns: input.pronouns,
          student_number: input.student_number,
          university: input.uni,
          github: input.github,
          discord: input.discord,
          subscribe: input.subscribe,
        },
      })
    } catch (err: unknown) {
      // Narrow the error type
      if (err instanceof Error) {
        throw new Error(`Failed to update user metadata: ${err.message}`)
      } else {
        throw new Error("Failed to update user metadata: unknown error")
      }
    }

    const [user] = await ctx.db
      .update(User)
      .set({
        name: input.name?.trim(),
        preferred_name: input.preferred_name?.trim(),
        pronouns: input.pronouns?.trim(),
        student_number: input.student_number?.trim() ?? null,
        university: input.uni?.trim() ?? null,
        github: input.github?.trim(),
        discord: input.discord?.trim(),
        subscribe: input.subscribe,
      })
      .where(eq(User.id, currentUser.id))
      .returning()

    return user
  })
