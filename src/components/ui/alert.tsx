import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const alertVariants = cva(
  [
    "relative grid w-full items-start gap-x-2 gap-y-0.5 border px-3.5 py-3 text-sm text-foreground has-data-[slot=alert-action]:grid-cols-[1fr_auto]",
    "has-[>svg]:grid-cols-[--spacing(4)_1fr] has-[>svg]:gap-x-2 has-[>svg]:has-data-[slot=alert-action]:grid-cols-[--spacing(4)_1fr_auto] [&>svg]:h-lh [&>svg]:w-4",
    "has-[>span.material-symbols-sharp]:grid-cols-[--spacing(4)_1fr] has-[>span.material-symbols-sharp]:gap-x-2 has-[>span.material-symbols-sharp]:has-data-[slot=alert-action]:grid-cols-[--spacing(4)_1fr_auto] [&>.material-symbols-sharp]:text-base! [&>.material-symbols-sharp]:leading-5!",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary-foreground",
        destructive:
          "bg-background text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>.material-symbols-sharp]:text-current [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("font-medium [.material-symbols-sharp~&]:col-start-2 [svg~&]:col-start-2", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "flex flex-col gap-2.5 text-muted-foreground [.material-symbols-sharp~&]:col-start-2 [svg~&]:col-start-2",
        className,
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "flex gap-1 max-sm:col-start-2 max-sm:mt-2 sm:row-start-1 sm:row-end-3 sm:self-center sm:[[data-slot=alert-description]~&]:col-start-2 sm:[[data-slot=alert-title]~&]:col-start-2",
        "sm:[svg~&]:col-start-2 sm:[svg~[data-slot=alert-description]~&]:col-start-3 sm:[svg~[data-slot=alert-title]~&]:col-start-3",
        "sm:[.material-symbols-sharp~&]:col-start-2 sm:[.material-symbols-sharp~[data-slot=alert-description]~&]:col-start-3 sm:[.material-symbols-sharp~[data-slot=alert-title]~&]:col-start-3",
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
