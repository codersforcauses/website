"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RscBoundaryProvider } from "@rsc-boundary/next"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { TRPCReactProvider } from "~/trpc/react"
import { TooltipProvider } from "~/ui/tooltip"
import { SheetProvider } from "~/ui/sheet"
import { AnchoredToastProvider, ToastProvider } from "~/ui/toast"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RscBoundaryProvider>
      <TRPCReactProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SheetProvider>
            <ToastProvider>
              <AnchoredToastProvider>
                <TooltipProvider>
                  <NuqsAdapter>{children}</NuqsAdapter>
                </TooltipProvider>
              </AnchoredToastProvider>
            </ToastProvider>
          </SheetProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </TRPCReactProvider>
    </RscBoundaryProvider>
  )
}
