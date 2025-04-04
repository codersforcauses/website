import type { Metadata, Viewport } from "next"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"

import TitleText from "../_components/title-text"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Branding",
  ...customMetadata({
    name: "Our Branding",
    page: "branding",
    description: "Logos, colour schemes, icons and more...",
    image:
      "https://og-social-cards.vercel.app/**.%2Fbranding**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  }),
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./branding</TitleText>
      {children}
    </main>
  )
}

export default Layout
