import { Ratelimit } from "@upstash/ratelimit"
import { inArray } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const getNamesByEmails = publicRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
  .input(z.object({ emails: z.array(z.string().email()) }))
  .query(async ({ ctx, input }) => {
    const users = await ctx.db.query.User.findMany({
      columns: { name: true, email: true },
      where: inArray(User.email, input.emails),
    })

    return users.map((u) => u.name)
  })
