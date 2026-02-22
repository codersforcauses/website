import Header from "~/components/header"
import Footer from "~/components/footer"

export default function Layout({ children }: LayoutProps<"/general-meetings/[slug]">) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
