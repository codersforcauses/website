import { eq, sql } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const getUserCount = adminProcedure.query(async ({ ctx }) => {
  const [[userCount], [memberCount]] = await Promise.all([
    ctx.db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(User),
    ctx.db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(User)
      .where(eq(User.role, "member")),
  ])

  return {
    users: userCount?.count ?? 0,
    members: memberCount?.count ?? 0,
  }
})
