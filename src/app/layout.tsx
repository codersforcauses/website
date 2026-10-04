import "@material-symbols/font-400/sharp.css"
import "~/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Coders for Causes",
  description: "Coders for Causes",
  icons: [{ rel: "icon", url: "/favicon.png" }],
}

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})
const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: "variable",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} isolate touch-manipulation bg-black font-sans selection:bg-accented selection:text-background-dark`}
    >
      <body className="relative antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
