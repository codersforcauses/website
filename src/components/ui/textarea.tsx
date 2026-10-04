import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { inputVariants } from "./input"

function Textarea({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof inputVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      className={cn(inputVariants({ variant }), "field-sizing-content min-h-16", className)}
      {...props}
    />
  )
}

export { Textarea }
