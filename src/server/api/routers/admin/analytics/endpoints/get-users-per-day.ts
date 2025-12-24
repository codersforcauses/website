import { eachDayOfInterval, format, subMonths } from "date-fns"
import { and, between, count, isNotNull, sql } from "drizzle-orm"
import { z } from "zod/mini"

import { adminProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

/**
 * Get number of users signed up per day.
 * @param {number} - Number of months to query: 1, 3, 6, 12, and 0 where 0 is all time
 * @returns {Promise<Object>} - Object returning the data and number of members and non-members
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
 */
const getUsersPerDay = adminProcedure.input(z.number()).query(async ({ ctx, input }) => {
  const currentDate = new Date()
  const relativeMonths = input === 0 ? new Date("2024-02-21T00:00:00") : subMonths(currentDate, input)

  const daySQL = sql`TO_CHAR(${users.createdAt}, 'YYYY-MM-DD')`

  const memberQuery = ctx.db
    .select({
      day: daySQL.mapWith(String),
      members: count(),
    })
    .from(users)
    .where(and(isNotNull(users.role), between(users.createdAt, relativeMonths, currentDate)))
    .groupBy(daySQL)
    .orderBy(daySQL)
  const userQuery = ctx.db
    .select({
      day: daySQL.mapWith(String),
      users: count(),
    })
    .from(users)
    .where(between(users.createdAt, relativeMonths, currentDate))
    .groupBy(daySQL)
    .orderBy(daySQL)

  const [userCount, memberCount] = await Promise.all([userQuery, memberQuery])

  const days = eachDayOfInterval({
    start: relativeMonths,
    end: currentDate,
  })

  const data = days.map((day) => {
    const formatted = format(day, "yyyy-MM-dd")
    const users = userCount.find((u) => u.day === formatted)?.users ?? 0
    const members = memberCount.find((u) => u.day === formatted)?.members ?? 0

    return {
      date: formatted,
      nonMembers: users - members,
      members,
    }
  })

  return data
})

export default getUsersPerDay
