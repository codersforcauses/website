import { Icon } from "@radix-ui/react-select"
import type { Metadata, Viewport } from "next"

import { IconBar } from "~/components/merch/icon-bar"

import { customMetadata } from "~/lib/metadata"
import { type PropsWithChildren } from "~/lib/types"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title: "Merch",
  ...customMetadata({
    name: "Merch",
    page: "merch",
    description: "Coders for Causes merch store.",
    image:
      // "https://og-social-cards.vercel.app/**.%2Fmerch**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg",
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
    <>
      <main className="main">
        <div>
          <IconBar />
        </div>
        {children}
      </main>
    </>
  )
}

export default Layout
