import { type PropsWithChildren } from "~/lib/types"
import TitleText from "~/app/_components/title-text"

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <main className="main">
      <TitleText typed>./settings</TitleText>
      {children}
    </main>
  )
}

export default Layout
