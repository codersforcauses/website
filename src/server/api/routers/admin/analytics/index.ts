import { createTRPCRouter } from "~/server/api/trpc"

import { getGenderStatistics } from "./get-gender-statistics"
import { getUserCount } from "./get-user-count"
import { getUsersPerDay } from "./get-users-per-day"

export const analyticsAdminRouter = createTRPCRouter({
  getUserCount,
  getUsersPerDay,
  getGenderStatistics,
})
