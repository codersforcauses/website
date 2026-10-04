import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const inputVariants = cva(
  "flex w-full min-w-0 border bg-transparent px-3 py-1 text-base transition-all outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:animate-wiggle md:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-border text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-primary/50 aria-invalid:border-destructive/70 aria-invalid:ring-destructive/40 focus-visible:aria-invalid:border-destructive",
        dark: "border-border-dark text-foreground-dark placeholder:text-muted-foreground-dark focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50 aria-invalid:border-destructive-dark/70 aria-invalid:ring-destructive-dark/40 focus-visible:aria-invalid:border-destructive-dark",
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
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(
        inputVariants({ variant }),
        "h-9 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium data-[variant=dark]:file:text-foreground-dark data-[variant=default]:file:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Input, inputVariants }
