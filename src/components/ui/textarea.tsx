import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const inputVariants = cva(
  "flex field-sizing-content min-h-16 w-full border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "placeholder:text-neutral-500 focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 dark:placeholder:text-neutral-400 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        dark: "border-white/20 text-neutral-50 placeholder:text-neutral-400 focus-visible:border-neutral-300 focus-visible:ring-neutral-300/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Textarea({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof inputVariants>) {
  return <textarea data-slot="textarea" className={cn(inputVariants({ variant, className }))} {...props} />
}

export { Textarea }
