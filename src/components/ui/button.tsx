import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  // "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-100 outline-none select-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_.material-symbols-sharp]:pointer-events-none [&_.material-symbols-sharp]:shrink-0 [&_.material-symbols-sharp:not([class*='leading-'])]:leading-none! [&_.material-symbols-sharp:not([class*='text-'])]:text-base! [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-black bg-black text-primary-foreground hover:border-primary! hover:bg-primary! focus-visible:border-foreground focus-visible:ring-primary/50 dark:border-white dark:bg-white",
        dark: "bg-white text-background-dark hover:bg-primary-dark focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50",
        destructive:
          "border-destructive/20 bg-destructive/20 text-destructive hover:bg-destructive/25 focus-visible:border-foreground focus-visible:ring-primary/50",
        "destructive-dark":
          "text-destructive-bg-destructive-dark border-destructive-dark/20 bg-destructive-dark/20 hover:bg-destructive-dark/25 focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground focus-visible:border-foreground focus-visible:ring-primary/50",
        "outline-dark":
          "border-border-dark bg-background-dark hover:bg-muted-dark hover:text-foreground-dark focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50",
        secondary:
          "border-accent bg-accent text-foreground hover:border-accent/80 hover:bg-accent/80 focus-visible:border-foreground focus-visible:ring-primary/50",
        "secondary-dark":
          "border-accent-dark bg-accent-dark text-foreground-dark hover:border-accent-dark/80 hover:bg-accent-dark/80 focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50",
        ghost:
          "border-transparent hover:border-muted hover:bg-muted hover:text-foreground focus-visible:border-foreground focus-visible:ring-primary/50",
        "ghost-dark":
          "border-transparent text-foreground-dark hover:border-muted-dark hover:bg-muted-dark hover:text-foreground-dark focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50",
        "ghost-destructive":
          "border-transparent hover:bg-destructive/25 hover:text-destructive focus-visible:border-foreground focus-visible:ring-primary/50",
        link: "border-transparent text-foreground underline-offset-4 hover:underline focus-visible:border-foreground focus-visible:ring-primary/50",
        "link-dark":
          "border-transparent text-foreground-dark underline-offset-4 hover:underline focus-visible:border-foreground-dark focus-visible:ring-primary-dark/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>.material-symbols-sharp]:px-3 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs! has-[>.material-symbols-sharp]:px-2 has-[>svg]:px-2",
        sm: "h-8 gap-1.5 px-3 text-[0.8rem]! has-[>.material-symbols-sharp]:px-2.5 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>.material-symbols-sharp]:px-4 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6",
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
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }
