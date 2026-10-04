"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "~/lib/utils"

function Avatar({
  className,
  size = "default",
  rounded = false,
  ...props
}: AvatarPrimitive.Root.Props & {
  rounded?: boolean
  size?: "default" | "sm" | "lg" | "xl" | "2xl"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-rounded={rounded}
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken data-[rounded=true]:rounded-full data-[rounded=true]:after:rounded-full data-[size=2xl]:size-42 data-[size=lg]:size-10 data-[size=sm]:size-6 data-[size=xl]:size-20 dark:after:mix-blend-lighten",
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover group-data-[rounded=true]/avatar:rounded-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center bg-muted-dark text-sm text-accented group-data-[rounded=true]/avatar:rounded-full group-data-[size=2xl]/avatar:text-xl group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        // "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center bg-white text-neutral-950 bg-blend-color ring-2 ring-white select-none group-data-rounded/avatar:rounded-full dark:bg-neutral-950 dark:text-neutral-50 dark:ring-neutral-950",
        // "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        // "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        // "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none group-data-[rounded=true]/avatar:rounded-full",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        // "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white dark:ring-neutral-950",
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        // " bg-neutral-100 text-sm text-neutral-500 ring-2 ring-white group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-data-rounded/avatar:rounded-full dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-950 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        "relative flex size-8 shrink-0 items-center justify-center bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-data-[rounded=true]/avatar:rounded-full [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge }
