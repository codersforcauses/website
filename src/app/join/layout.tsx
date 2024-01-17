import TitleText from "../_components/title-text"
import { type PropsWithChildren } from "~/lib/types"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./join</TitleText>
      {children}
    </main>
  )
}

export default Layout
