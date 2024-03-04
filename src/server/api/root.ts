import { createTRPCRouter } from "~/server/api/trpc"
import { userRouter } from "~/server/api/routers/user"
import { paymentRouter } from "~/server/api/routers/payment"
import { analyticsRouter } from "~/server/api/routers/analytics"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  payment: paymentRouter,
  analytics: analyticsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
