import { sql } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const getGenderStatistics = adminProcedure.query(async ({ ctx }) => {
  const data = await ctx.db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
      pronouns: User.pronouns,
    })
    .from(User)
    .groupBy(User.pronouns)

  return data
})
