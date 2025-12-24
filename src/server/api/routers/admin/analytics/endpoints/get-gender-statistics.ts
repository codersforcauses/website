import { sql } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

/**
 * Get gender statistics from the database.
 * @returns {Promise<Object>} - Key-value pairs of pronouns and their respective counts.
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
 */
const getGenderStatistics = adminProcedure.query(async ({ ctx }) => {
  const data = await ctx.db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
      pronouns: users.pronouns,
    })
    .from(users)
    .groupBy(users.pronouns)

  return data
})

export default getGenderStatistics
