import type { PropsWithChildren } from "~/lib/types"

import TitleText from "../_components/title-text"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./events</TitleText>
      {children}
    </main>
  )
}

export default Layout
