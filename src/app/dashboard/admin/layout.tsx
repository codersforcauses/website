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
  projects: React.ReactNode
  // events: React.ReactNode
  analytics: React.ReactNode
  tools: React.ReactNode
}

const Layout = ({ children, ...props }: AdminDashLayoutProps) => {
  const sidebarItems = [
    { text: "Users", icon: "group", component: props.users },
    { text: "Projects", icon: "devices", component: props.projects },
    // { text: "Events", icon: "event", component: <Placeholder /> },
    { text: "Analytics", icon: "analytics", component: props.analytics },
    { text: "Tools", icon: "service_toolbox", component: props.tools },
  ]

  return (
    <main className="main container py-4 ">
      <Tabs defaultValue={sidebarItems[0]?.text} className="flex flex-col md:flex-row">
        <TabsList className="h-full flex-grow p-1 md:h-auto md:flex-grow-0">
          <div className="flex md:grid md:h-min md:w-52 md:max-w-xs md:grid-cols-1 md:gap-1 md:self-start">
            <div className="flex items-center p-1">
              <div className="grid size-[42px] min-w-[42px] place-items-center bg-black font-mono font-semibold text-white dark:bg-white dark:text-black">
                cfc
              </div>
              <h1 className="hidden md:block ml-2 font-mono font-bold leading-tight text-primary">Admin Dashboard</h1>
            </div>
            {sidebarItems.map(({ text, icon }) => (
              <TabsTrigger
                key={text}
                value={text}
                className="group flex justify-start focus:ring-1 focus:ring-muted-foreground data-[state=active]:flex-grow md:h-[42px]"
              >
                <span className="material-symbols-sharp size-6">{icon}</span>
                <span className="ml-2 hidden group-data-[state=active]:block sm:block">{text}</span>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        <div className="flex-grow py-8 md:px-8 md:py-0">
          {sidebarItems.map(({ text, component }) => (
            <TabsContent key={text} value={text} className="mt-0">
              {component}
            </TabsContent>
          ))}
        </div>
      </Tabs>
      {children}
    </main>
  )
}

export default Layout
