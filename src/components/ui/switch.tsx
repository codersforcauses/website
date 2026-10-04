"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "~/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center border border-border transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-foreground focus-visible:ring-3 focus-visible:ring-primary/50 aria-invalid:border-destructive/70 aria-invalid:ring-destructive/20 data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-unchecked:bg-muted data-[size=default]:h-4.5 data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block h-full bg-background ring-0 transition-all group-data-[size=default]/switch:w-2 group-data-[size=sm]/switch:w-1.5 data-checked:bg-primary-foreground group-data-[size=default]/switch:data-checked:translate-x-[calc(250%+2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(250%+1px)] data-unchecked:translate-x-0 data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
