"use client"

import { OTPFieldPreview as OTP } from "@base-ui/react/otp-field"

import { cn } from "~/lib/utils"
import { inputVariants } from "./input"

const DEFAULT_OTP_LENGTH = 6

function InputOTP({ className, ...props }: OTP.Root.Props) {
  return (
    <OTP.Root
      data-slot="input-otp"
      className={cn("group/input-otp flex flex-nowrap items-center data-disabled:opacity-50", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("inline-flex items-center", className)} {...props} />
}

function InputOTPSlot({
  index,
  className,
  ...props
}: OTP.Input.Props & {
  index: number
}) {
  return (
    <OTP.Input
      data-slot="input-otp-slot"
      data-index={index}
      aria-label={`Character ${index + 1}`}
      className={cn(
        inputVariants({ variant: "default" }),
        "size-9 appearance-none border-y text-center text-sm transition-all outline-none group-aria-invalid/input-otp:border-destructive/70 group-aria-invalid/input-otp:ring-destructive/40 first:border-l group-aria-invalid/input-otp:focus-visible:border-destructive",
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSeparator({ className, ...props }: OTP.Separator.Props) {
  return <OTP.Separator data-slot="input-otp-separator" className={cn("h-px w-4 bg-border", className)} {...props} />
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, DEFAULT_OTP_LENGTH }
