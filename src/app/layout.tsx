import { ClerkProvider } from "@clerk/nextjs"
import "@material-symbols/font-300/sharp.css"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import Footer from "~/components/footer"
import Header from "~/components/header"
import { Toaster } from "~/components/ui/toaster"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"
import "~/styles/globals.css"

import Providers from "./providers"

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})
const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: {
    template: "%s | Coders for Causes",
    default: "Coders for Causes",
  },
  ...customMetadata({
    name: "Coders for Causes",
    description:
      "Coders for Causes is a software engineering club at UWA specializing in web development. We build custom software for charities and not for profits and give students the skills they need to succeed in the industry.",
    image:
      "https://og-social-cards.vercel.app/**.%2FInnovation%20with%20a%20mission**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  }),
}

export const dynamic = "force-dynamic"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider clerkJSVariant="headless">
      <html
        lang="en-AU"
        suppressHydrationWarning
        className={`${sans.variable} ${mono.variable} touch-manipulation scroll-smooth bg-black font-sans selection:bg-alt-accent selection:text-black`}
      >
        <head />
        <body className="antialiased">
          <Providers>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </Providers>
          {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && <Analytics />}
        </body>
      </html>
    </ClerkProvider>
  )
}
