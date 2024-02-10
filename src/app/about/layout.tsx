import { type Metadata } from "next"
import TitleText from "../_components/title-text"
import { type PropsWithChildren } from "~/lib/types"

export const metadata: Metadata = {
  title: "About",
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./about</TitleText>
      {children}
    </main>
  )
}

export default Layout
