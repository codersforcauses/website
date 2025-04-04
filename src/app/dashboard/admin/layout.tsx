"use client"

import * as React from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import type { PropsWithChildren } from "~/lib/types"
import { cn } from "~/lib/utils"

interface AdminDashLayoutProps extends PropsWithChildren {
  users: React.ReactNode
  // projects: React.ReactNode
  // events: React.ReactNode
  analytics: React.ReactNode
  tools: React.ReactNode
}

const Layout = ({ children, ...props }: AdminDashLayoutProps) => {
  const sidebarRef = React.useRef<ImperativePanelHandle>(null)
  const [collapsed, setCollapsed] = React.useState(false)

  const sidebarItems = [
    { text: "Users", icon: "group", component: props.users },
    // { text: "Projects", icon: "devices", component: <Placeholder /> },
    // { text: "Events", icon: "event", component: <Placeholder /> },
    { text: "Analytics", icon: "analytics", component: props.analytics },
    { text: "Tools", icon: "service_toolbox", component: props.tools },
  ]

  return (
    <main className="main container py-4">
      <Tabs orientation="vertical" defaultValue={sidebarItems[0]?.text}>
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
              {sidebarItems.map(({ text, icon }) => (
                <TabsTrigger
                  key={text}
                  value={text}
                  className={cn(!collapsed && "justify-start", "h-[42px] focus:ring-1 focus:ring-muted-foreground")}
                >
                  <span className="material-symbols-sharp size-6">{icon}</span>
                  <span className={cn("ml-2", collapsed && "sr-only")}>{text}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </ResizablePanel>
          <ResizableHandle withHandle className="w-3 bg-background" />
          <ResizablePanel defaultSize={75}>
            {sidebarItems.map(({ text, component }) => (
              <TabsContent key={text} value={text} className="mt-0">
                {component}
              </TabsContent>
            ))}
          </ResizablePanel>
        </ResizablePanelGroup>
      </Tabs>
      {children}
    </main>
  )
}

export default Layout
