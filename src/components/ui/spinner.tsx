"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const spinnerVariants = cva("material-symbols-sharp animate-spin", {
  variants: {
    size: {
      default: "text-base! leading-none!",
      sm: "",
      lg: "text-2xl! leading-none!",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Spinner({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  return (
    <span role="status" aria-label="Loading" className={cn(spinnerVariants({ size, className }))} {...props}>
      progress_activity
    </span>
  )
}

export { Spinner }
