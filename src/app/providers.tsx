"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { TRPCReactProvider } from "~/trpc/react"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  )
}
