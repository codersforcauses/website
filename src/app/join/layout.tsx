import type { Metadata, Viewport } from "next"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"

import TitleText from "../_components/title-text"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Join us",
  ...customMetadata({
    name: "Join us",
    page: "join",
    description: "Join Coders for Causes and help make a difference.",
    image:
      // "https://og-social-cards.vercel.app/**.%2Fjoin**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
      "https://og-social-cards.vercel.app/" +
      `**${encodeURIComponent("./join")}**.png?` +
      "theme=dark&" +
      "md=1&" +
      "fontSize=125px&" +
      `images=${encodeURIComponent("https://codersforcauses.org/logo/cfc_logo_white_full.svg")}`,
  }),
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./join</TitleText>
      <div className="container grid gap-y-8 py-12 md:grid-cols-2 md:gap-x-8">
        {children}
        <div aria-hidden className="hidden place-items-center font-mono leading-none md:grid">
          <span className="text-8xl">:)</span>
        </div>
      </div>
    </main>
  )
}

export default Layout
