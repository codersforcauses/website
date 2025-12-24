import { SidebarInset, SidebarProvider } from "~/ui/sidebar"
import { TypingText } from "~/ui/typing-text"
import SettingsSidebar from "./sidebar"

export default function Layout({ children }: LayoutProps<"/profile/settings">) {
  return (
    <main id="main" className="bg-white dark:bg-neutral-950">
      <div className="bg-black pt-18 pb-9 text-neutral-50 md:pt-24 md:pb-12">
        <div className="container mx-auto px-4">
          <h1 className="font-mono text-2xl select-none md:text-3xl">
            <TypingText text="./settings" />
          </h1>
        </div>
      </div>
      <SidebarProvider className="container mx-auto min-h-[calc(100vh-(288px+180px+48px))] p-4">
        <SettingsSidebar />
        <SidebarInset>
          <div className="@container/main">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
