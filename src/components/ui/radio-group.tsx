"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "~/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(
        "grid w-full gap-2",
        // "grid gap-3",
        className,
      )}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        // "text-neutral-900 transition-[color,box-shadow] focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:text-neutral-50 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 border border-border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-foreground focus-visible:ring-3 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/70 aria-invalid:ring-destructive/40 focus-visible:aria-invalid:border-destructive aria-invalid:aria-checked:border-destructive/70 aria-invalid:aria-checked:bg-destructive/70 data-checked:border-primary data-checked:bg-primary data-checked:text-background",
        className,
      )}
      {...props}
    >
      <span className="absolute top-0.75 left-0.75 size-2 bg-border/50" />
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
        // className="relative"
      >
        {/* <span className="absolute size-2 bg-current" /> */}
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-background" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
