import { createTRPCRouter } from "~/server/api/trpc"

import getGenderStatistics from "./endpoints/get-gender-statistics"
import getUsersPerDay from "./endpoints/get-users-per-day"

export const analyticsAdminRouter = createTRPCRouter({
  getGenderStatistics,
  getUsersPerDay,
})
