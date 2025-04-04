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
      // email: z
      //   .string()
      //   .email({
      //     message: "Invalid email address",
      //   })
      // .min(2, {
      //   message: "Email is required",
      // })
      // .optional(),
      pronouns: z
        .string()
        .min(2, {
          message: "Pronouns are required",
        })
        .optional(),
      student_number: z.string().nullish(),
      uni: z.string().optional().nullish(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const currentUser = ctx.user
    // TODO: update clerk email
    // TODO: Wrap in a transaction
    await clerkClient().users.updateUser(currentUser.clerk_id, {
      // emailAddress: input.email,
      firstName: input.preferred_name,
      lastName: input.name,
    })

    const [user] = await ctx.db
      .update(User)
      .set({
        name: input.name?.trim(),
        preferred_name: input.preferred_name?.trim(),
        // email: input.email?.trim(),
        pronouns: input.pronouns?.trim(),
        student_number: input.student_number?.trim() ?? null,
        university: input.uni?.trim() ?? null,
      })
      .where(eq(User.id, currentUser.id))
      .returning()

    return user
  })
