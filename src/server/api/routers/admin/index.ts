import { createTRPCRouter } from "~/server/api/trpc"
import { analyticsAdminRouter } from "./analytics"
import { usersAdminRouter } from "./users"

export const adminRouter = createTRPCRouter({
  analytics: analyticsAdminRouter,
  users: usersAdminRouter,
})
