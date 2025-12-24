"use client"

import * as React from "react"
import * as OTP from "@radix-ui/react-one-time-password-field"

import { cn } from "~/lib/utils"

function InputOTP({ className, children, ...props }: OTP.OneTimePasswordFieldProps) {
  return (
    <OTP.Root data-slot="input-otp" className={cn("group flex items-center gap-2", className)} {...props}>
      {children}
      <OTP.HiddenInput />
    </OTP.Root>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
}

function InputOTPSlot({
  index,
  className,
  ...props
}: OTP.OneTimePasswordFieldInputProps & {
  index: number
}) {
  return (
    <OTP.Input
      data-slot="input-otp-slot"
      data-index={index}
      className={cn(
        "size-9 appearance-none border-y border-r text-center text-sm transition-all outline-none group-aria-invalid:border-red-500 first:border-l focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 group-aria-invalid:focus-visible:ring-red-500/20 disabled:opacity-50 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50 dark:group-aria-invalid:focus-visible:ring-red-500/20",
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn("h-px w-4 bg-neutral-500 dark:bg-neutral-400", className)}
      {...props}
    />
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
