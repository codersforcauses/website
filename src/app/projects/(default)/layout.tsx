import { TypingText } from "~/ui/typing-text"

export default function Layout({ children }: LayoutProps<"/projects">) {
  return (
    <main id="main" className="h-full min-h-[calc(100vh-288px)] bg-white dark:bg-neutral-950">
      <div className="bg-black pt-18 pb-9 text-neutral-50 md:pt-24 md:pb-12">
        <div className="container mx-auto h-full px-4">
          <h1 aria-label="join" className="font-mono text-2xl select-none md:text-3xl">
            <TypingText text="./projects" />
          </h1>
        </div>
      </div>
      {children}
    </main>
  )
}
