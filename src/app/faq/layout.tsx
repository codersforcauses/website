import type { Metadata, Viewport } from "next"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"

import TitleText from "../_components/title-text"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Faq",
  ...customMetadata({
    name: "Faq",
    page: "faq",
    description: "Frequently Asked Questions",
    image:
      "https://og-social-cards.vercel.app/**.%2Ffaq**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  }),
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./frequently asked questions</TitleText>
      {children}
    </main>
  )
}

export default Layout
