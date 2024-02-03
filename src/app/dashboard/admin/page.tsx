"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
import { cn } from "~/lib/utils"
import { type ImperativePanelHandle } from "react-resizable-panels"
import { Separator } from "~/components/ui/separator"
import UserData from "./_components/user-table"

const sidebarItems = [
  { text: "Users", slug: "users", icon: "group" },
  { text: "Projects", slug: "projects", icon: "devices" },
  { text: "Events", slug: "events", icon: "event" },
  { text: "Analytics", slug: "analytics", icon: "analytics" },
]

export default function AdminDashboard() {
  const sidebarRef = React.useRef<ImperativePanelHandle>(null)
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <main className="main">
      <div className="container h-full py-4">
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
            <ToggleGroup type="single" defaultValue={sidebarItems[0]?.slug} className="flex flex-col p-1">
              {sidebarItems.map(({ slug, text, icon }) => (
                <ToggleGroupItem
                  key={slug}
                  value={slug}
                  className={cn(
                    "box-border w-full data-[state=on]:bg-background data-[state=on]:text-foreground",
                    !collapsed && "justify-start",
                  )}
                >
                  <span className={cn("material-symbols-sharp size-6", !collapsed && "mr-2")}>{icon}</span>
                  {!collapsed && text}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ResizablePanel>
          <ResizableHandle withHandle className="w-3 bg-background" />
          <ResizablePanel defaultSize={75}>
            <UserData />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  )
}
