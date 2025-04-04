/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { currentUser } from "@clerk/nextjs/server"
import * as Sentry from "@sentry/nextjs"
import { TRPCError, initTRPC } from "@trpc/server"
import { Ratelimit, type RatelimitConfig } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import superjson from "superjson"
import { ZodError } from "zod"

import { db } from "~/server/db"
import { User } from "~/server/db/schema"

import { buildIdentifier, createRatelimit } from "./ratelimit"

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { ip?: string; headers: Headers }) => {
  const clerkUser = await currentUser()

  return {
    db,
    clerkUser,
    ...opts,
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * 3. MIDDLEWARE
 *
 * This is where you can define reusable middleware that can be used across multiple procedures.
 */

/** Middleware that makes sure transactions related to RPCs are well-named */
const sentryMiddleware = t.middleware(Sentry.trpcMiddleware({ attachRpcInput: true }))

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.clerkUser) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const user = await ctx.db.query.User.findFirst({
    where: eq(User.clerk_id, ctx.clerkUser.id),
  })

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: `Could not find the user with Clerk id: ${ctx.clerkUser.id}` })
  }

  return next({
    ctx: {
      user,
      clerkUser: ctx.clerkUser,
    },
  })
})

/**
 * Reusable middleware that enforces rate limits on requests.
 * This is currently set to 5 requests every 10 seconds per procedure per user.
 * To set per-procedure rate limits, you can simply follow this pattern in the procedure itself.
 */
const createRatelimiter = (limiter?: RatelimitConfig["limiter"]) =>
  t.middleware(async ({ next, ctx, type, path }) => {
    if (process.env.VERCEL_ENV !== "production") {
      return next()
    }

    const identifier = buildIdentifier({ ctx, type, path })
    const { success } = await createRatelimit(limiter ?? Ratelimit.slidingWindow(5, "10s")).limit(identifier)

    if (!success) {
      throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
    }

    return next()
  })

/**
 * 4. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(sentryMiddleware)

/**
 * @param limiter - The rate limit configuration to use for this procedure. Default is 5 request in a 10s sliding window.
 *
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicRatedProcedure = (limiter?: RatelimitConfig["limiter"]) =>
  t.procedure.use(createRatelimiter(limiter)).use(sentryMiddleware)
/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed).use(sentryMiddleware)
/**
 * @param limiter - The rate limit configuration to use for this procedure. Default is 5 request in a 10s sliding window.
 *
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedRatedProcedure = (limiter?: RatelimitConfig["limiter"]) =>
  t.procedure.use(createRatelimiter(limiter)).use(enforceUserIsAuthed).use(sentryMiddleware)
/**
 * Protected (authenticated) procedure for admin users
 *
 * If you want a query or mutation to ONLY be accessible to admin users, use this. It verifies
 * the session is valid while guaranteeing `ctx.session.user` is not null. Also checks if the user
 * is an admin or committee member.
 *
 * @see https://trpc.io/docs/procedures
 */
export const adminProcedure = t.procedure
  .use(enforceUserIsAuthed)
  .use(sentryMiddleware)
  .use(async ({ ctx, next }) => {
    const currentUser = ctx.user

    if (currentUser.role !== "admin" && currentUser.role !== "committee")
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to access this API." })

    return next()
  })
