import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const get = publicRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const user = await ctx.db.query.User.findFirst({
      where: eq(User.id, input),
    })

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: `User with id: ${input} does not exist` })
    }

    return user
  })
