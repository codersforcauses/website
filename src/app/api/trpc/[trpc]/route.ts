import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"

import { env } from "~/env"
import { appRouter } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    ip: req.ip,
    headers: req.headers,
  })
}

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: ({ path, error }) => {
      if (env.NODE_ENV === "development") {
        console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
      }

      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error(error) // TODO: Send to error monitoring
      }
    },
  })

export { handler as GET, handler as POST }
