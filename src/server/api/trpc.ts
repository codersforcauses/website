/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server"
import * as Sentry from "@sentry/nextjs"
import { Ratelimit, type RatelimitConfig } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import superjson from "superjson"
import * as z from "zod"

import { auth } from "~/lib/auth"
import { db } from "~/server/db"
import { ADMIN_ROLES } from "~/lib/constants"
import { env } from "~/env"

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
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  })

  return {
    db,
    session,
    ...opts,
  }
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get type-safety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof z.ZodError ? z.flattenError(error.cause) : null,
      },
    }
  },
})

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
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
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

/** Middleware that makes sure transactions related to RPCs are well-named */
const sentryMiddleware = t.middleware(Sentry.trpcMiddleware({ attachRpcInput: true }))

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthedMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Reusable middleware that enforces rate limits on requests.
 * This is currently set to 5 requests every 10 seconds per procedure per user.
 * To set per-procedure rate limits, you can simply follow this pattern in the procedure itself.
 */
const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
  retry: {
    retries: 5,
    backoff: (retryCount) => Math.exp(retryCount) * 100,
  },
})

const ratelimitMiddleware = (limiter: RatelimitConfig["limiter"] = Ratelimit.slidingWindow(5, "10s")) =>
  t.middleware(async ({ next, ctx, type, path }) => {
    if (process.env.VERCEL_ENV !== "production") {
      return next()
    }

    const rateLimit = new Ratelimit({
      redis,
      limiter,
      analytics: true,
      /**
       * Optional: A prefix to apply to all keys used in the rate limiter.
       * Useful if you want to share a Redis instance with other applications.
       */
      prefix: "@cfc/website/",
    })

    const ipIdentifier = /* req.ip ?? */ ctx.headers.get("x-forwarded-for") ?? "unknown"
    const identifier = `${ctx.session?.user.id ?? ipIdentifier}:${type}:${path}`
    const { success, pending, limit, reset, remaining } = await rateLimit.limit(identifier)

    // Wait for the Redis update to complete (recommended for edge environments)
    await pending

    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        // TODO: use these vals as headers?
        message: JSON.stringify({
          limit,
          remaining,
          reset,
        }),
      })
    }

    return next()
  })

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware).use(sentryMiddleware)
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
  t.procedure.use(ratelimitMiddleware(limiter)).use(timingMiddleware).use(sentryMiddleware)

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(enforceUserIsAuthedMiddleware)
  .use(sentryMiddleware)
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
  t.procedure.use(ratelimitMiddleware(limiter)).use(enforceUserIsAuthedMiddleware).use(sentryMiddleware)

/**
 * Admin (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null. Also checks if the user
 * is an admin or committee member.
 *
 * @see https://trpc.io/docs/procedures
 */
export const adminProcedure = t.procedure.use(timingMiddleware).use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  if (!ctx.session.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to access this resource." })
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
