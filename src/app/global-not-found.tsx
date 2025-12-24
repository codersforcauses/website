import "@material-symbols/font-400/sharp.css"
import "~/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import Header from "~/components/header"
import Footer from "~/components/footer"
import { Providers } from "./providers"
import GlitchScreen from "~/ui/glitch-screen"
import { Button } from "~/ui/button"
import Link from "next/link"

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
  userScalable: false,
}

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
}

export default function GlobalNotFound() {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} touch-manipulation scroll-smooth bg-black font-sans selection:bg-accent selection:text-neutral-950`}
    >
      <body className="root antialiased">
        <Providers>
          <Header />
          <main
            id="main"
            className="relative min-h-[calc(100svh-288px)] w-full overflow-hidden bg-white select-none md:mt-4 md:h-[calc(100svh-(288px+48px+16px))] md:min-h-0 dark:bg-neutral-950"
          >
            <GlitchScreen smooth glitchSpeed={250}>
              <div className="absolute inset-0">
                <div className="container mx-auto grid size-full place-items-center px-4">
                  <div className="flex w-fit flex-col gap-2">
                    <h1 className="text-center font-mono text-[10rem]/40 font-bold tracking-tight text-balance md:text-[16rem]/55">
                      404
                    </h1>
                    <p className="bg-white font-medium md:text-2xl dark:bg-neutral-950">
                      We could not locate this page in the matrix
                    </p>
                    <Button asChild size="lg">
                      <Link href="/">Return to home page</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </GlitchScreen>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
