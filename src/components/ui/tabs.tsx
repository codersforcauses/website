"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "~/lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center bg-neutral-100 p-[3px] text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap text-neutral-500 ring-offset-white transition-[color,box-shadow] hover:text-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 dark:text-neutral-400 dark:ring-offset-neutral-950 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300/50 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50 [&_svg]:shrink-0 [&_svg]:text-neutral-500 dark:[&_svg]:text-neutral-400 [&:hover_svg]:text-neutral-900 dark:[&:hover_svg]:text-neutral-50 [&[data-state=active]_svg]:text-neutral-900 dark:[&[data-state=active]_svg]:text-neutral-50",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
