import TitleText from "~/app/_components/title-text"
import type { PropsWithChildren } from "~/lib/types"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./dashboard</TitleText>
      {children}
    </main>
  )
}

export default Layout
