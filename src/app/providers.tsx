import { cookies } from "next/headers"

import { type PropsWithChildren } from "~/lib/types"
import { ThemeProvider } from "~/components/theme-provider"
import { TRPCReactProvider } from "~/trpc/react"

export default async function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider enableSystem disableTransitionOnChange attribute="class" defaultTheme="system">
      <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
    </ThemeProvider>
  )
  // ) : (
  //   import("@builder.io/react-hydration-overlay").then(({ HydrationOverlay }) => (
  //     <HydrationOverlay>
  //       <ThemeProvider enableSystem disableTransitionOnChange attribute="class" defaultTheme="system">
  //         <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
  //       </ThemeProvider>
  //     </HydrationOverlay>
  //   ))
  // )
}
