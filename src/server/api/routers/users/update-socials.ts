import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { User } from "~/server/db/schema"
import { protectedRatedProcedure } from "~/server/api/trpc"

export const updateSocials = protectedRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
  .input(
    z.object({
      github: z.string().optional().nullish(),
      discord: z.string().optional().nullish(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const currentUser = ctx.user

    const [user] = await ctx.db
      .update(User)
      .set({
        github: input.github?.trim(),
        discord: input.discord?.trim(),
      })
      .where(eq(User.id, currentUser.id))
      .returning()

    return user
  })
