import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const inputVariants = cva(
  [
    "flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
  ],
  {
    variants: {
      variant: {
        default:
          "file:text-neutral-950 placeholder:text-neutral-500 focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
        dark: "border-white/20 text-neutral-50 outline-white/5 file:text-neutral-50 placeholder:text-neutral-400 focus-visible:border-neutral-300 focus-visible:ring-neutral-300/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Input({
  className,
  type,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return <input type={type} data-slot="input" className={cn(inputVariants({ variant, className }))} {...props} />
}

export { Input }
