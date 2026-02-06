import { eq, sql } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { Project } from "~/server/db/schema"

export const getProjectCount = adminProcedure.query(async ({ ctx }) => {
  const [result] = await ctx.db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(Project)
    .where(eq(Project.is_public, true))

  return { publicProjects: result?.count ?? 0 }
})
