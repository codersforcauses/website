"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "~/components/ui/toast"
import { useToast } from "~/hooks/use-toast"

import { cn } from "~/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  // console.log(toasts)

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, className, style, ...props }, i) => {
        const order = toasts.length - 1 - i

        return (
          <Toast
            key={id}
            className={cn(
              "toast md:toast-large col-span-full row-span-full transition-transform duration-200 ease-in-out",
              className,
            )}
            style={
              {
                "--index": i,
                ...style,
              } as React.CSSProperties
            }
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
