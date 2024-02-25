"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"

import { type AppRouter } from "~/server/api/root"
import { getUrl, transformer } from "./shared"

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // If enabled, this causes the SERVER to refetch on every window focus in a full page reload. Probably a bug.
        refetchOnWindowFocus: process.env.NEXT_PUBLIC_VERCEL_ENV === "production",
      },
    },
  })

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}
export const api = createTRPCReact<AppRouter>()

export function TRPCReactProvider(props: { children: React.ReactNode; cookies: string }) {
  const queryClient = getQueryClient()

  const [trpcClient] = React.useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: props.cookies,
              "x-trpc-source": "react",
            }
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}
