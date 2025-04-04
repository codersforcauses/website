import { paymentsRouter } from "~/server/api/routers/payments"
import { usersRouter } from "~/server/api/routers/users"
import { createTRPCRouter } from "~/server/api/trpc"

import { adminRouter } from "./routers/admin"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  payments: paymentsRouter,
  admin: adminRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
