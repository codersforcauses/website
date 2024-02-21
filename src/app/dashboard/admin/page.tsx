"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { type ImperativePanelHandle } from "react-resizable-panels"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { cn } from "~/lib/utils"
import UserData from "./_components/user-table"
import Placeholder from "./_components/placeholder"

const sidebarItems = [
  { text: "Users", slug: "users", icon: "group", component: <UserData /> },
  { text: "Projects", slug: "projects", icon: "devices", component: <Placeholder /> },
  { text: "Events", slug: "events", icon: "event", component: <Placeholder /> },
  { text: "Analytics", slug: "analytics", icon: "analytics", component: <Placeholder /> },
]

export default function AdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sidebarRef = React.useRef<ImperativePanelHandle>(null)
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <main className="main container py-4">
      <Tabs orientation="vertical" value={searchParams.get("tab") ?? sidebarItems[0]?.slug}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            ref={sidebarRef}
            tagName="nav"
            collapsible
            defaultSize={17}
            maxSize={25}
            minSize={17}
            collapsedSize={4}
            className={cn(
              collapsed ? "w-[50px] transition-all duration-300 ease-in-out" : "max-w-[250px]",
              "box-border min-w-[50px] bg-muted",
            )}
            onCollapse={() => setCollapsed(true)}
            onExpand={() => setCollapsed(false)}
          >
            <div className="flex items-center p-1">
              <div
                className={cn(
                  "grid size-[42px] min-w-[42px] place-items-center bg-black font-mono font-semibold text-white dark:bg-white dark:text-black",
                  collapsed && "aspect-square w-full",
                )}
              >
                cfc
              </div>
              {!collapsed && <h1 className="ml-2 font-mono font-bold leading-tight">Admin Dashboard</h1>}
            </div>
            <Separator className="bg-background" />
            <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1">
              {sidebarItems.map(({ slug, text, icon }) => (
                <TabsTrigger
                  asChild
                  key={slug}
                  value={slug}
                  className={cn(!collapsed && "justify-start", "h-[42px] focus:ring-1 focus:ring-muted-foreground")}
                >
                  <Link href={`?tab=${slug}`}>
                    <span className={cn("material-symbols-sharp size-6", !collapsed && "mr-2")}>{icon}</span>
                    {!collapsed && text}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </ResizablePanel>
          <ResizableHandle withHandle className="w-3 bg-background" />
          <ResizablePanel defaultSize={75}>
            {sidebarItems.map(({ slug, component }) => (
              <TabsContent key={slug} value={slug} className="mt-0">
                {component}
              </TabsContent>
            ))}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Tabs>
    </main>
  )
}
