import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const skeletonVariants = cva("animate-pulse", {
  variants: {
    variant: {
      default: "bg-neutral-200 dark:bg-neutral-800",
      dark: "bg-neutral-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Skeleton({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return <div data-slot="skeleton" className={cn(skeletonVariants({ variant, className }))} {...props} />
}

export { Skeleton }
