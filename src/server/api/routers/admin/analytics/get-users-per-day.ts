import { eachDayOfInterval, subMonths } from "date-fns"
import { and, between, isNotNull, sql } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const getUsersPerDay = adminProcedure.query(async ({ ctx }) => {
  const twoMonths = subMonths(new Date(), 2)
  const days = eachDayOfInterval({
    start: twoMonths,
    end: new Date(),
  })
  // TODO optimize later
  const [userCount, memberCount] = await Promise.all([
    ctx.db
      .select({
        day: sql<number>`extract(day from created_at)`.mapWith(Number),
        month: sql<number>`extract(month from created_at)`.mapWith(Number),
        year: sql<number>`extract(year from created_at)`.mapWith(Number),
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(User)
      .where(between(User.created_at, twoMonths, new Date()))
      .groupBy(
        sql`extract(day from created_at)`,
        sql`extract(month from created_at)`,
        sql`extract(year from created_at)`,
      )
      .orderBy(
        sql`extract(year from created_at)`,
        sql`extract(month from created_at)`,
        sql`extract(day from created_at)`,
      ),
    ctx.db
      .select({
        day: sql<number>`extract(day from created_at)`.mapWith(Number),
        month: sql<number>`extract(month from created_at)`.mapWith(Number),
        year: sql<number>`extract(year from created_at)`.mapWith(Number),
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(User)
      .where(and(isNotNull(User.role), between(User.created_at, twoMonths, new Date())))
      .groupBy(
        sql`extract(day from created_at)`,
        sql`extract(month from created_at)`,
        sql`extract(year from created_at)`,
      )
      .orderBy(
        sql`extract(year from created_at)`,
        sql`extract(month from created_at)`,
        sql`extract(day from created_at)`,
      ),
  ])

  const data = days.map((date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return {
      date,
      users: userCount.find((row) => day === row.day && month === row.month && year === row.year)?.count ?? 0,
      members: memberCount.find((row) => day === row.day && month === row.month && year === row.year)?.count ?? 0,
    }
  })

  return data
})
