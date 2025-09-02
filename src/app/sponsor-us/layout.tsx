import type { Metadata, Viewport } from "next"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"

import TitleText from "../_components/title-text"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Sponsor Us",
  ...customMetadata({
    name: "Sponsor Us",
    page: "sponsor-us",
    description:
      "Coders for Causes is a software engineering club at UWA specializing in web development. We build custom software for charities and not for profits and give students the skills they need to succeed in the industry.",
    image:
      "https://og-social-cards.vercel.app/**.%2Fabout**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
  }),
}

const Layout = ({ children }: PropsWithChildren) => {
  return <main className="main">{children}</main>
}

export default Layout
