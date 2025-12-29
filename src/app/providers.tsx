"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { pacerDevtoolsPlugin } from "@tanstack/react-pacer-devtools"

import { TRPCReactProvider } from "~/trpc/react"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
      <TanStackDevtools
        eventBusConfig={{
          debug: false,
        }}
        plugins={[pacerDevtoolsPlugin()]}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </TRPCReactProvider>
  )
}
