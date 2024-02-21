import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex touch-none items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        dark: "bg-neutral-50 text-black ring-offset-black hover:bg-neutral-50/90 focus-visible:ring-neutral-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-black/25 bg-background hover:bg-accent hover:text-accent-foreground dark:border-white/25",
        "outline-dark":
          "border border-neutral-50/25 ring-offset-black bg-black hover:bg-neutral-50/25 focus-visible:ring-neutral-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "secondary-dark":
          "bg-neutral-800 text-neutral-50 ring-offset-black hover:bg-neutral-800/80 focus-visible:ring-neutral-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        "ghost-dark": "text-neutral-50 ring-offset-black hover:bg-neutral-50/10 focus-visible:ring-neutral-300",
        link: "text-primary underline-offset-4 hover:underline",
        "link-dark":
          "text-neutral-50 underline-offset-4 ring-offset-black hover:underline focus-visible:ring-neutral-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
