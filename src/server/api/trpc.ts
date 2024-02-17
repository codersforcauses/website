/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { currentUser } from "@clerk/nextjs"
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { db } from "~/server/db"
import { buildIdentifier, globalRatelimit } from "./ratelimit"

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
export const createTRPCContext = async (opts: { method: string; path: string; ip?: string; headers: Headers }) => {
  const user = await currentUser()

  return {
    db,
    user,
    ...opts,
  }
}

/**
 * The following is true for both client-side and server-side requests:
 * - `db` is the Prisma client
 * - `user` is the logged in user (if any)
 * - `headers` is the request headers
 *
 * In a client-side request, the following apply:
 * - `method` is the HTTP method (e.g. "GET", "POST")
 * - `path` is the URL path (e.g. "/api/trpc")
 * - `ip` is the client's IP address (undefined if local)
 *
 * In a server-side call, the following apply:
 * - `method` is the tRPC method (e.g. "query", "mutation", "subscription")
 * - `path` is the tRPC procedure path (e.g. "user.get")
 */
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

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

/**
 * Reusable middleware that enforces rate limits on requests.
 * This is currently set to 10 requests every 10 seconds per procedure per user.
 * To set per-procedure rate limits, you can simply follow this pattern in the procedure itself.
 */
export const rateLimiter = t.middleware(async ({ ctx, next }) => {
  const identifier = buildIdentifier(ctx)
  const { success } = await globalRatelimit.limit(identifier)

  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
  }

  return next({
    ctx,
  })
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
export const publicProcedure = t.procedure.use(rateLimiter)

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(rateLimiter).use(enforceUserIsAuthed)
