"use client"

import Link from "next/link"
import * as React from "react"
import { useState } from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"

import { Button } from "~/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import type { PropsWithChildren } from "~/lib/types"
import { cn } from "~/lib/utils"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="main container py-4 flex flex-col md:flex-row">
      <AdminHeader />
      <div className="w-full md:ml-3">{children}</div>
    </main>
  )
}

export default Layout

interface AdminHeaderItem {
  href: string
  text: string
  icon: string
}

const links: Array<AdminHeaderItem> = [
  { href: "/dashboard/admin/users", text: "Users", icon: "group" },
  { href: "/dashboard/admin/projects", text: "Projects", icon: "work" },
  { href: "/dashboard/admin/analytics", text: "Analytics", icon: "analytics" },
  { href: "/dashboard/admin/tools", text: "Tools", icon: "service_toolbox" },
  // { href: "events", text: "Events", icon: "event" },
]

const AdminHeader = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className=" flex md:flex-col items-center md:items-start bg-muted max-w-52">
        <Link href={"/dashboard/admin"} className="flex items-center p-1  md:border-b-2 border-b-background w-full">
          <div
            className={cn(
              "grid size-[42px] min-w-[42px] place-items-center bg-black font-mono font-semibold text-white dark:bg-white dark:text-black aspect-square ",
            )}
          >
            cfc
          </div>
          <h1 className="ml-2 font-mono font-bold leading-tight">Admin Dashboard</h1>
        </Link>
        <span className="material-symbols-sharp  md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          arrow_forward_ios
        </span>
        <div className=" bg-muted w-full p-1.5 gap-1 hidden md:flex flex-col text-sm">
          {links.map(({ text, href, icon }) => (
            <Link
              key={text}
              href={href}
              className="flex gap-2 p-2 w-full items-center text-muted-foreground cursor-pointer hover:bg-background"
            >
              <span className="material-symbols-sharp size-6">{icon}</span>
              <div>{text}</div>
            </Link>
          ))}
        </div>
      </div>
      {open && (
        <div
          className={` top-1/2 left-0 transform 
            -translate-y-1/2 
            ${open ? "translate-x-0" : "translate-x-full"} 
            transition-transform duration-1000 ease-out bg-muted p-1.5 fixed w-full h-full z-50  `}
        >
          <Link
            href={"/dashboard/admin"}
            className="flex items-center p-1  border-b-2 border-b-background w-full"
            onClick={() => setOpen(!open)}
          >
            <div
              className={cn(
                "grid size-[42px] min-w-[42px] place-items-center bg-black font-mono font-semibold text-white dark:bg-white dark:text-black aspect-square ",
              )}
            >
              cfc
            </div>
            <h1 className="ml-2 font-mono font-bold leading-tight">Admin Dashboard</h1>
          </Link>
          <div className="grid h-auto w-full grid-cols-1 gap-1 p-2 text-sm">
            {links.map(({ text, href, icon }) => (
              <Link
                key={text}
                href={href}
                className="flex gap-2 p-2 items-center text-muted-foreground cursor-pointer hover:bg-background"
                onClick={() => setOpen(!open)}
              >
                <span className="material-symbols-sharp size-6 cursor-pointer">{icon}</span>
                <div>{text}</div>
              </Link>
            ))}
          </div>
          <Button onClick={() => setOpen(!open)} className="mt-40 w-full">
            Back
          </Button>
        </div>
      )}
    </>
  )
}
