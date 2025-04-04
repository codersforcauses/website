import { sql } from "drizzle-orm"
import { User } from "~/server/db/schema"
import { adminProcedure } from "~/server/api/trpc"

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
