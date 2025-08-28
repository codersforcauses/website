import type { Metadata, Viewport } from "next"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"

import TitleText from "../_components/title-text"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Hack for Homes Itinerary",
  ...customMetadata({
    name: "Hack for Homes Itinerary",
    page: "Hack for Homes Itinerary",
    description:
      "How can we improve housing accessibility and living conditions for Western Australians struggling to find affordable, safe, and stable housing during the current housing crisis?",
    image:
      "https://og-social-cards.vercel.app/**.%2Fabout**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  }),
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./hack for homes</TitleText>
      {children}
    </main>
  )
}

export default Layout
