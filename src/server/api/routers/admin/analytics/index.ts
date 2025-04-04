import { createTRPCRouter } from "~/server/api/trpc"
import { getUserCount } from "./get-user-count"
import { getUsersPerDay } from "./get-users-per-day"
import { getGenderStatistics } from "./get-gender-statistics"

export const analyticsAdminRouter = createTRPCRouter({
  getUserCount,
  getUsersPerDay,
  getGenderStatistics,
})
