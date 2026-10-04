"use client"

import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { useIsMobile } from "~/hooks/use-mobile"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/ui/button"

const toastManager = ToastPrimitive.createToastManager()
const anchoredToastManager = ToastPrimitive.createToastManager()

const TOAST_ICONS = {
  error: "error",
  info: "info",
  loading: "progress_activity",
  success: "check_circle",
  warning: "warning",
} as const

type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
interface ToastProviderProps extends ToastPrimitive.Provider.Props {
  position?: ToastPosition
}

function ToastProvider({ children, position = "bottom-right", ...props }: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider toastManager={toastManager} {...props}>
      {children}
      <Toasts position={position} />
    </ToastPrimitive.Provider>
  )
}
function Toasts({ position: pos }: { position: ToastPosition }) {
  const isMobile = useIsMobile()
  const { toasts } = ToastPrimitive.useToastManager()
  const defaultPosition = isMobile ? "top-center" : "bottom-right"
  const position = pos ?? defaultPosition
  const isTop = position.startsWith("top")
  return (
    <ToastPrimitive.Portal data-slot="toast-portal">
      <ToastPrimitive.Viewport
        className={cn(
          "fixed z-50 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]",
          // Vertical positioning
          "data-[position*=top]:top-(--toast-inset)",
          "data-[position*=bottom]:bottom-(--toast-inset)",
          // Horizontal positioning
          "data-[position*=left]:left-(--toast-inset)",
          "data-[position*=right]:right-(--toast-inset)",
          "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2",
        )}
        data-position={position}
        data-slot="toast-viewport"
      >
        {toasts.map((toast) => {
          const icon = toast.type ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] : null
          return (
            <ToastPrimitive.Root
              key={toast.id}
              data-position={position}
              toast={toast}
              swipeDirection={
                position.includes("center")
                  ? [isTop ? "up" : "down"]
                  : position.includes("left")
                    ? ["left", isTop ? "up" : "down"]
                    : ["right", isTop ? "up" : "down"]
              }
              className={cn(
                "absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full border bg-background text-foreground select-none [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s] not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0",
                // Base positioning using data-position
                "data-[position*=right]:right-0 data-[position*=right]:left-auto",
                "data-[position*=left]:right-auto data-[position*=left]:left-0",
                "data-[position*=center]:right-0 data-[position*=center]:left-0",
                "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-top",
                "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-bottom",
                // Gap fill for hover
                "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
                "data-[position*=top]:after:top-full",
                "data-[position*=bottom]:after:bottom-full",
                // Define some variables
                "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))]",
                // Define offset-y variable
                "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
                "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
                // Default state transform
                "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
                "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
                // Limited state
                "data-limited:opacity-0",
                // Expanded state
                "data-expanded:h-(--toast-height)",
                "data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",
                // Starting and ending animations
                "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]",
                "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
                "data-ending-style:opacity-0",
                // Ending animations (direction-aware)
                "data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
                "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
                "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
                // Ending animations (expanded)
                "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
                "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
              )}
            >
              <ToastPrimitive.Content className="pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-250 data-behind:opacity-0 data-behind:not-data-expanded:pointer-events-none data-expanded:opacity-100">
                <div className="flex gap-2">
                  {icon && (
                    <span
                      className="material-symbols-sharp in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning pointer-events-none h-lh w-4 shrink-0 text-base! leading-none! in-data-[type=error]:text-destructive in-data-[type=loading]:animate-spin in-data-[type=loading]:opacity-80"
                      data-slot="toast-icon"
                    >
                      {icon}
                    </span>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <ToastPrimitive.Title className="font-medium" data-slot="toast-title" />
                    <ToastPrimitive.Description className="text-muted-foreground" data-slot="toast-description" />
                  </div>
                </div>
                {toast.actionProps && (
                  <ToastPrimitive.Action className={buttonVariants({ size: "xs" })} data-slot="toast-action">
                    {toast.actionProps.children}
                  </ToastPrimitive.Action>
                )}
              </ToastPrimitive.Content>
            </ToastPrimitive.Root>
          )
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}

function AnchoredToastProvider({ children, ...props }: ToastPrimitive.Provider.Props) {
  return (
    <ToastPrimitive.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <AnchoredToasts />
    </ToastPrimitive.Provider>
  )
}
function AnchoredToasts() {
  const { toasts } = ToastPrimitive.useToastManager()
  return (
    <ToastPrimitive.Portal data-slot="toast-portal-anchored">
      <ToastPrimitive.Viewport className="outline-none" data-slot="toast-viewport-anchored">
        {toasts.map((toast) => {
          const icon = toast.type ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] : null
          const tooltipStyle = (toast.data as { tooltipStyle?: boolean })?.tooltipStyle ?? false
          const positionerProps = toast.positionerProps
          if (!positionerProps?.anchor) {
            return null
          }
          return (
            <ToastPrimitive.Positioner
              className="z-50 max-w-[min(--spacing(64),var(--available-width))]"
              data-slot="toast-positioner"
              key={toast.id}
              sideOffset={positionerProps.sideOffset ?? 4}
              toast={toast}
            >
              <ToastPrimitive.Root
                className="relative border bg-background text-xs text-balance text-foreground transition-[scale,opacity] not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0"
                data-slot="toast-popup"
                toast={toast}
              >
                {tooltipStyle ? (
                  <ToastPrimitive.Content className="pointer-events-auto px-2 py-1">
                    <ToastPrimitive.Title data-slot="toast-title" />
                  </ToastPrimitive.Content>
                ) : (
                  <ToastPrimitive.Content className="pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm">
                    <div className="flex gap-2">
                      {icon && (
                        <span
                          className="material-symbols-sharp in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning pointer-events-none h-lh w-4 shrink-0 text-base! leading-none! in-data-[type=error]:text-destructive in-data-[type=loading]:animate-spin in-data-[type=loading]:opacity-80"
                          data-slot="toast-icon"
                        >
                          {icon}
                        </span>
                      )}
                      <div className="flex flex-col gap-0.5">
                        <ToastPrimitive.Title className="font-medium" data-slot="toast-title" />
                        <ToastPrimitive.Description className="text-muted-foreground" data-slot="toast-description" />
                      </div>
                    </div>
                    {toast.actionProps && (
                      <ToastPrimitive.Action className={buttonVariants({ size: "xs" })} data-slot="toast-action">
                        {toast.actionProps.children}
                      </ToastPrimitive.Action>
                    )}
                  </ToastPrimitive.Content>
                )}
              </ToastPrimitive.Root>
            </ToastPrimitive.Positioner>
          )
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}
export { ToastProvider, type ToastPosition, toastManager, AnchoredToastProvider, anchoredToastManager, ToastPrimitive }

// function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>) {
//   return (
//     <ToastPrimitives.Viewport
//       className={cn(
//         "toast-container group fixed top-0 z-100 grid max-h-screen w-full p-4 sm:top-auto sm:right-0 sm:bottom-0 md:max-w-md",
//         className,
//       )}
//       {...props}
//     />
//   )
// }

// const toastVariants = cva(
//   "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden border p-4 pr-6 transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=end]:animate-out data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:transition-none data-[state=open]:sm:slide-in-from-bottom-full",
//   {
//     variants: {
//       variant: {
//         default: "border bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50",
//         destructive: "destructive group text-destructive-foreground border-destructive bg-destructive",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// )

// function Toast({
//   className,
//   variant,
//   ...props
// }: React.ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>) {
//   return <ToastPrimitives.Root duration={100000} className={cn(toastVariants({ variant }), className)} {...props} />
// }

// function ToastAction({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Action>) {
//   return (
//     <ToastPrimitives.Action
//       className={cn(
//         "group-[.destructive]:hover:text-destructive-foreground inline-flex h-8 shrink-0 items-center justify-center border bg-transparent px-3 text-sm font-medium transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive focus:ring-1 focus:ring-muted-foreground focus:outline-none group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
//         className,
//       )}
//       {...props}
//     />
//   )
// }

// function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Close>) {
//   return (
//     <ToastPrimitives.Close
//       aria-label="Close"
//       className={cn(
//         "absolute top-1 right-1 p-1 text-neutral-950/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-neutral-950 group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:ring-1 focus:outline-none group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:text-neutral-50/50 dark:hover:text-neutral-50",
//         className,
//       )}
//       {...props}
//     >
//       <span aria-hidden className="material-symbols-sharp text-base! leading-none!">
//         close
//       </span>
//     </ToastPrimitives.Close>
//   )
// }

// function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Title>) {
//   return <ToastPrimitives.Title className={cn("text-sm font-semibold", className)} {...props} />
// }

// function ToastDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>) {
//   return (
//     <ToastPrimitives.Description
//       className={cn("text-sm leading-tight text-neutral-800 dark:text-neutral-200", className)}
//       {...props}
//     />
//   )
// }
