import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc"
import { adminRouter } from "~/server/api/routers/admin"
import { userRouter } from "~/server/api/routers/user"
import { paymentRouter } from "~/server/api/routers/payment"
import { generalMeetingsRouter } from "~/server/api/routers/general-meetings"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  user: userRouter,
  payment: paymentRouter,
  generalMeetings: generalMeetingsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
