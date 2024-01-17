import * as React from "react"

import { cn } from "~/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  dark?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, dark, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border border-black/25 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/25",
          dark &&
            "border-white/25 bg-black ring-offset-black placeholder:text-neutral-500 focus-visible:ring-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
