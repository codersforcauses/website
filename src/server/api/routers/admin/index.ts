import { projectsAdminRouter } from "~/server/api/routers/admin/projects"
import { createTRPCRouter } from "~/server/api/trpc"

import { analyticsAdminRouter } from "./analytics"
import { usersAdminRouter } from "./users"

export const adminRouter = createTRPCRouter({
  analytics: analyticsAdminRouter,
  users: usersAdminRouter,
  projects: projectsAdminRouter,
})
