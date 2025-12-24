"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const dropdownVariants = cva(
  "group/dropdown z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto border p-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  {
    variants: {
      variant: {
        default: "bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50",
        dark: "border-white/20 bg-black text-neutral-50",
        // destructive: ""
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function DropdownMenu(props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal(props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger(props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  className,
  variant = "default",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & VariantProps<typeof dropdownVariants>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        data-variant={variant}
        sideOffset={sideOffset}
        className={cn(dropdownVariants({ variant, className }))}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup(props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default items-center gap-2 px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp]:leading-none! [&_.material-symbols-sharp:not([class*='size-'])]:size-4 [&_.material-symbols-sharp:not([class*='text-'])]:text-base! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=dark]/dropdown:focus:bg-neutral-800 group-data-[variant=dark]/dropdown:focus:text-neutral-50 group-data-[variant=default]/dropdown:focus:bg-neutral-100 group-data-[variant=default]/dropdown:focus:text-neutral-900 dark:group-data-[variant=default]/dropdown:focus:bg-neutral-800 dark:group-data-[variant=default]/dropdown:focus:text-neutral-50",
        "group-data-[variant=dark]/dropdown:[&_.material-symbols-sharp:not([class*='text-neutral-'])]:text-neutral-400 group-data-[variant=default]/dropdown:[&_.material-symbols-sharp:not([class*='text-neutral-'])]:text-neutral-500 dark:group-data-[variant=default]/dropdown:[&_.material-symbols-sharp:not([class*='text-neutral-'])]:text-neutral-400 group-data-[variant=dark]/dropdown:[&_svg:not([class*='text-neutral-'])]:text-neutral-400 group-data-[variant=default]/dropdown:[&_svg:not([class*='text-neutral-'])]:text-neutral-500 dark:group-data-[variant=default]/dropdown:[&_svg:not([class*='text-neutral-'])]:text-neutral-400",
        "data-[variant=destructive]:text-red-500 data-[variant=destructive]:focus:bg-red-50 data-[variant=destructive]:focus:text-red-500 dark:data-[variant=destructive]:focus:bg-red-950 dark:data-[variant=destructive]:focus:text-red-400 data-[variant=destructive]:*:[.material-symbols-sharp]:text-red-500 data-[variant=destructive]:*:[svg]:text-red-500",
        className,
      )}
      {...props}
    />
  )
}

// Can't use group/peer classes if used in portal
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp:not([class*='size-'])]:size-4",
        "focus:bg-neutral-100 dark:focus:bg-neutral-800",
        className,
      )}
      checked={checked}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
          check
        </span>
      </DropdownMenuPrimitive.ItemIndicator>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=dark]/dropdown:focus:bg-neutral-800 group-data-[variant=dark]/dropdown:focus:text-neutral-50 group-data-[variant=default]/dropdown:focus:bg-neutral-100 group-data-[variant=default]/dropdown:focus:text-neutral-900 dark:group-data-[variant=default]/dropdown:focus:bg-neutral-800 dark:group-data-[variant=default]/dropdown:focus:text-neutral-50",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="size-2 rounded-full bg-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm font-medium data-inset:pl-8", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        "-mx-1 my-1 h-px group-data-[variant=dark]/dropdown:bg-white/20 group-data-[variant=default]/dropdown:bg-black/20 dark:group-data-[variant=default]/dropdown:bg-white/20",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest group-data-[variant=dark]/dropdown:text-neutral-400 group-data-[variant=default]/dropdown:text-neutral-500 dark:group-data-[variant=default]/dropdown:text-neutral-400",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub(props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center px-2 py-1.5 text-sm outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-900 data-inset:pl-8 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50",
        className,
      )}
      {...props}
    >
      {children}
      <span className="material-symbols-sharp ml-auto text-base! leading-none!">chevron_right</span>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden border bg-white p-1 text-neutral-950 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-neutral-950 dark:text-neutral-50",
        className,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
