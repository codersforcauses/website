"use client"

import * as React from "react"
import { environmentManager, QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { createTRPCClient, httpBatchStreamLink, loggerLink } from "@trpc/client"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import SuperJSON from "superjson"

import { getBaseUrl } from "~/lib/utils"
import { createQueryClient } from "./query-client"
import type { AppRouter } from "./types"

let clientQueryClientSingleton: QueryClient | undefined = undefined
export function getQueryClient() {
  // Server: always make a new query client
  if (environmentManager.isServer()) {
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient()

  return clientQueryClientSingleton
}

const { TRPCProvider, useTRPC: useApi } = createTRPCContext<AppRouter>()
export { useApi }

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = React.useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers()
            headers.set("x-trpc-source", "cfc-client")
            return headers
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
