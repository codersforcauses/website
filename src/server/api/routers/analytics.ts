import { and, between, isNotNull, sql } from "drizzle-orm"
import { eachDayOfInterval, subMonths } from "date-fns"

import { adminProcedure, createTRPCRouter } from "~/server/api/trpc"
import { payments, users } from "~/server/db/schema"

export const analyticsRouter = createTRPCRouter({
  count: adminProcedure.query(async ({ ctx }) => {
    const [[userCount], [memberCount]] = await Promise.all([
      ctx.db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(users),
      ctx.db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(users)
        .where(isNotNull(users.role)),
    ])

    return {
      users: userCount?.count ?? 0,
      members: memberCount?.count ?? 0,
    }
  }),

  usersPerDay: adminProcedure.query(async ({ ctx }) => {
    const twoMonths = subMonths(new Date(), 2)
    const days = eachDayOfInterval({
      start: twoMonths,
      end: new Date(),
    })
    // TODO optimize later
    const [userCount, memberCount] = await Promise.all([
      ctx.db
        .select({
          day: sql<number>`day(created_at)`.mapWith(Number),
          month: sql<number>`month(created_at)`.mapWith(Number),
          year: sql<number>`year(created_at)`.mapWith(Number),
          count: sql<number>`count(*)`.mapWith(Number),
        })
        .from(users)
        .where(between(users.createdAt, twoMonths, new Date()))
        .groupBy(sql`day(created_at)`, sql`month(created_at)`, sql`year(created_at)`)
        .orderBy(sql`year(created_at)`, sql`month(created_at)`, sql`day(created_at)`),
      ctx.db
        .select({
          day: sql<number>`day(created_at)`.mapWith(Number),
          month: sql<number>`month(created_at)`.mapWith(Number),
          year: sql<number>`year(created_at)`.mapWith(Number),
          count: sql<number>`count(*)`.mapWith(Number),
        })
        .from(users)
        .where(and(isNotNull(users.role), between(users.createdAt, twoMonths, new Date())))
        .groupBy(sql`day(created_at)`, sql`month(created_at)`, sql`year(created_at)`)
        .orderBy(sql`year(created_at)`, sql`month(created_at)`, sql`day(created_at)`),
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
  }),
})
