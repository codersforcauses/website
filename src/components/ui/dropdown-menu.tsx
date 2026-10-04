"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const dropdownVariants = cva(
  "group/dropdown z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto border p-1 duration-100 outline-none data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        dark: "border-border-dark bg-black text-foreground-dark",
        // destructive: ""
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}
function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}
function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  variant = "default",
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset"> &
  VariantProps<typeof dropdownVariants>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          data-variant={variant}
          className={cn(dropdownVariants({ variant, className }))}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // "gap-2 px-2 py-1.5 data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp]:leading-none! [&_.material-symbols-sharp:not([class*='size-'])]:size-4 [&_.material-symbols-sharp:not([class*='text-'])]:text-base! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // "group-data-[variant=dark]/dropdown:focus:bg-neutral-800 group-data-[variant=dark]/dropdown:focus:text-neutral-50 group-data-[variant=default]/dropdown:focus:bg-neutral-100 group-data-[variant=default]/dropdown:focus:text-neutral-900 dark:group-data-[variant=default]/dropdown:focus:bg-neutral-800 dark:group-data-[variant=default]/dropdown:focus:text-neutral-50",
        // "group-data-[variant=dark]/dropdown:[&_.material-symbols-sharp:not([class*='text-neutral-'])]:text-neutral-400 group-data-[variant=default]/dropdown:[&_.material-symbols-sharp:not([class*='text-neutral-'])]:text-neutral-500 dark:group-data-[variant=default]/dropdown:[&_.material-symbols-sharp:not([class*='text-neutral-'])]:text-neutral-400 group-data-[variant=dark]/dropdown:[&_svg:not([class*='text-neutral-'])]:text-neutral-400 group-data-[variant=default]/dropdown:[&_svg:not([class*='text-neutral-'])]:text-neutral-500 dark:group-data-[variant=default]/dropdown:[&_svg:not([class*='text-neutral-'])]:text-neutral-400",
        // "data-[variant=destructive]:text-red-500 data-[variant=destructive]:focus:bg-red-50 data-[variant=destructive]:focus:text-red-500 dark:data-[variant=destructive]:focus:bg-red-950 dark:data-[variant=destructive]:focus:text-red-400 data-[variant=destructive]:*:[.material-symbols-sharp]:text-red-500 data-[variant=destructive]:*:[svg]:text-red-500",
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7",
        "[&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp]:text-base! [&_.material-symbols-sharp]:leading-none! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:*:[svg]:text-destructive",
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground",
        // "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
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
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      checked={checked}
      className={cn(
        "relative flex cursor-default items-center gap-2 py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp:not([class*='size-'])]:size-4",
        "focus:bg-neutral-100 dark:focus:bg-neutral-800",
        "relative flex cursor-default items-center gap-1.5 py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {/* <DropdownMenuPrimitive.ItemIndicator className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
          check
        </span>
      </DropdownMenuPrimitive.ItemIndicator> */}
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
            check
          </span>
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        // "gap-2 py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        // "group-data-[variant=dark]/dropdown:focus:bg-neutral-800 group-data-[variant=dark]/dropdown:focus:text-neutral-50 group-data-[variant=default]/dropdown:focus:bg-neutral-100 group-data-[variant=default]/dropdown:focus:text-neutral-900 dark:group-data-[variant=default]/dropdown:focus:bg-neutral-800 dark:group-data-[variant=default]/dropdown:focus:text-neutral-50",
        "relative grid w-full cursor-default grid-cols-[0.75rem_auto] items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none col-start-1 grid place-items-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator className="size-1.5 bg-current" />
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        "-mx-1 my-1 h-px group-data-[variant=dark]/dropdown:bg-border-dark group-data-[variant=default]/dropdown:bg-border",
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
        // "group-data-[variant=dark]/dropdown:text-neutral-400 group-data-[variant=default]/dropdown:text-neutral-500 dark:group-data-[variant=default]/dropdown:text-neutral-400",
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        // "px-2 py-1.5 focus:bg-neutral-100 focus:text-neutral-900 data-inset:pl-8 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-50",
        "flex cursor-default items-center gap-1.5 px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <span className="material-symbols-sharp ml-auto text-base! leading-none!">chevron_right</span>
      {/* <ChevronRightIcon className="cn-rtl-flip ml-auto" /> */}
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        // "z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden border",
        "w-auto min-w-24 bg-background p-1 text-foreground ring-1 ring-primary/50 duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
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
