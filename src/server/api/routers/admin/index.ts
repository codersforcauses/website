import { createTRPCRouter } from "~/server/api/trpc"

import { analyticsAdminRouter } from "./analytics"
import { generalMeetingsAdminRouter } from "./general-meetings"
import { usersAdminRouter } from "./users"

export const adminRouter = createTRPCRouter({
  analytics: analyticsAdminRouter,
  users: usersAdminRouter,
  generalMeetings: generalMeetingsAdminRouter,
})
