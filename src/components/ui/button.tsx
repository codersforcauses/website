import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50 [&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp:not([class*='size-'])]:text-base! [&_.material-symbols-sharp:not([class*='size-'])]:leading-none! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-black text-neutral-50 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100",
        dark: "bg-white text-neutral-950 hover:bg-neutral-200",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:bg-red-900 dark:hover:bg-red-900/90 dark:focus-visible:ring-red-900/20",
        outline:
          "border bg-white hover:bg-neutral-100 hover:text-neutral-950 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        "outline-dark": "border border-white/20 bg-neutral-950 hover:bg-neutral-800 hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700",
        "secondary-dark": "bg-neutral-800 text-neutral-50 hover:bg-neutral-700",
        ghost: "hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        "ghost-dark": "text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50 focus-visible:ring-neutral-300/50",
        link: "text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-50",
        "link-dark": "text-neutral-50 underline-offset-4 hover:underline focus-visible:ring-neutral-300/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>.material-symbols-sharp]:px-3 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>.material-symbols-sharp]:px-2.5 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>.material-symbols-sharp]:px-4 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
