import { paymentsRouter } from "~/server/api/routers/payments"
import { usersRouter } from "~/server/api/routers/users"
import { createTRPCRouter } from "~/server/api/trpc"

import { adminRouter } from "./routers/admin"
import { projectsRouter } from "./routers/projects"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  payments: paymentsRouter,
  admin: adminRouter,
  projects: projectsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
