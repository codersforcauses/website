import Header from "~/components/header"
import Footer from "~/components/footer"
import { TypingText } from "~/ui/typing-text"

export default function Layout({ children }: LayoutProps<"/join">) {
  return (
    <>
      <Header />
      <main id="main" className="h-full min-h-[calc(100vh-288px)] bg-white dark:bg-neutral-950">
        <div className="bg-black pt-18 pb-9 text-neutral-50 md:pt-24 md:pb-12">
          <div className="container mx-auto h-full px-4">
            <h1 className="font-mono text-2xl select-none md:text-3xl">
              <TypingText text="./join" />
            </h1>
          </div>
        </div>
        <div className="container mx-auto grid gap-x-8 gap-y-4 px-4 py-12 md:grid-cols-2 md:gap-y-8 lg:gap-x-16">
          {children}
          <div aria-hidden className="hidden place-items-center font-mono leading-none select-none md:grid">
            <span className="text-8xl">:)</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
