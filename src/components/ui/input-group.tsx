"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { Textarea } from "~/ui/textarea"

function InputGroup({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "dark"
}) {
  return (
    <div
      data-slot="input-group"
      data-variant={variant}
      role="group"
      className={cn(
        // // Variants based on alignment.
        // "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        // "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        // // Focus state.
        // "has-[[data-slot=input-group-control]:focus-visible]:border-neutral-950 has-[[data-slot=input-group-control]:focus-visible]:ring-neutral-950/50 dark:has-[[data-slot=input-group-control]:focus-visible]:border-neutral-300 dark:has-[[data-slot=input-group-control]:focus-visible]:ring-neutral-300/50",
        // // Error state.
        "group/input-group relative flex h-9 w-full min-w-0 items-center border transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        "data-[variant=default]:border-border data-[variant=default]:has-[[data-slot=input-group-control]:focus-visible]:border-foreground data-[variant=default]:has-[[data-slot=input-group-control]:focus-visible]:ring-primary/50 data-[variant=default]:has-[[data-slot=input-group-control]:focus-visible:[aria-invalid=true]]:border-destructive data-[variant=default]:has-[[data-slot][aria-invalid=true]]:border-destructive/70 data-[variant=default]:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        "data-[variant=dark]:border-border-dark data-[variant=dark]:text-foreground-dark data-[variant=dark]:has-[[data-slot=input-group-control]:focus-visible]:border-foreground-dark data-[variant=dark]:has-[[data-slot=input-group-control]:focus-visible]:ring-primary-dark/50 data-[variant=dark]:has-[[data-slot=input-group-control]:focus-visible:[aria-invalid=true]]:border-destructive-dark data-[variant=dark]:has-[[data-slot][aria-invalid=true]]:border-destructive-dark/70 data-[variant=dark]:has-[[data-slot][aria-invalid=true]]:ring-destructive-dark/40",
        className,
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&_.material-symbols-sharp]:leading-none! [&>.material-symbols-sharp]:text-base! [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        // "inline-start": "pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        // "inline-end": "pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        // "block-start":
        //   "px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        // "block-end": "px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
        "inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end": "order-last pr-1.5 has-[>button]:-mr-px has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align, className }))}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("flex items-center gap-2 text-sm", {
  variants: {
    size: {
      // xs: "px-2 has-[>svg]:px-2",
      // sm: "h-8 gap-1.5 px-2.5 has-[>svg]:px-2.5",
      xs: "h-6 gap-1 px-1.5 [&_.material-symbols-sharp:not([class*='text-'])]:text-sm! [&>svg:not([class*='size-'])]:size-3.5",
      sm: "",
      "icon-xs": "size-6 p-0 has-[>svg]:p-0 [&_.material-symbols-sharp:not([class*='text-'])]:text-sm!",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
})

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({ variant = "default", className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      variant={variant}
      className={cn("flex-1 border-0 ring-0 focus-visible:ring-0", className)}
      {...props}
    />
  )
}

function InputGroupTextarea({ variant = "default", className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      variant={variant}
      className={cn(
        // "py-3",
        "flex-1 resize-none border-0 py-2 ring-0 focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea }
