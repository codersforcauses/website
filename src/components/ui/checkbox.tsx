"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "~/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 border outline-none focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        "data-[state=checked]:border-neutral-900 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50 dark:data-[state=checked]:border-neutral-50 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=checked]:text-neutral-900",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {props.checked === "indeterminate" && (
          <span aria-hidden className="material-symbols-sharp text-sm! leading-none!">
            check_indeterminate_small
          </span>
        )}
        {props.checked === true && (
          <span aria-hidden className="material-symbols-sharp text-sm! leading-none!">
            check
          </span>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
