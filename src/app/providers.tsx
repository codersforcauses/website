import { cookies } from "next/headers"
// import { HydrationOverlay } from "@builder.io/react-hydration-overlay"

import { type PropsWithChildren } from "~/lib/types"
import { ThemeProvider } from "~/components/theme-provider"
import { TRPCReactProvider } from "~/trpc/react"

export default async function Providers({ children }: PropsWithChildren) {
  return (
    <>
      {/* <HydrationOverlay> */}
      <ThemeProvider enableSystem disableTransitionOnChange attribute="class" defaultTheme="system">
        <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
      </ThemeProvider>
      {/* </HydrationOverlay> */}
    </>
  )
}
