import Header from "~/components/header"
import Footer from "~/components/footer"

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
