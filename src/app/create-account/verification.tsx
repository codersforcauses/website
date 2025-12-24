import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { authClient } from "~/lib/auth-client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/ui/alert-dialog"
import { Button } from "~/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/ui/input-otp"
import { Field, FieldError } from "~/ui/field"

interface VerificationForm {
  email: string
  open: boolean
  changeActiveView: () => void
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 characters long"),
})

export default function VerificationDialog({ email, changeActiveView, ...props }: VerificationForm) {
  const [showResend, setShowResend] = React.useState(false)
  const [attempts, setAttempts] = React.useState(3)
  const form = useForm({
    defaultValues: {
      code: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value }) {
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email,
        otp: value.code,
      })
      if (error) console.log(JSON.stringify(error, null, 2))

      if (data) {
        props.onOpenChange(false)
        changeActiveView()
      } else if (error.code === "INVALID_OTP") {
        if (attempts <= 1) {
          form.setErrorMap({
            onSubmit: {
              fields: {
                code: {
                  message: "Too many incorrect attempts. Please try again later.",
                },
              },
            },
          })
          setShowResend(true)
        } else {
          form.setErrorMap({
            onSubmit: {
              fields: {
                code: {
                  message: `Invalid code. ${attempts - 1} attempts remaining.`,
                },
              },
            },
          })
        }
        setAttempts((prev) => prev - 1)
      }
    },
  })

  const resend = async () => {
    const { data } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    })
    if (data?.success) {
      setShowResend(false)
      setAttempts(3)
      form.reset()
    }
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent
        asChild
        className="sm:max-w-sm"
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <form
          className="grid gap-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await form.handleSubmit()
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Enter verification code</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {showResend ? (
              <>
                Too many incorrect attempts to verify email.
                <Button type="button" variant="link" className="ml-auto h-auto w-fit p-0" onClick={resend}>
                  Click here to resend code
                </Button>
              </>
            ) : (
              `We've sent a code to ${email}. Check your spam if you don't see it.`
            )}
          </AlertDialogDescription>
          <form.Field name="code">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <InputOTP
                    autoFocus
                    autoSubmit
                    id="code"
                    name="code"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onValueChange={field.handleChange}
                    aria-invalid={isInvalid}
                    className="font-mono"
                  >
                    <InputOTPGroup className="w-full">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot key={i} index={i} className="w-full" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <AlertDialogFooter className="grid grid-cols-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <div />
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} className="relative">
                  Continue
                  {isSubmitting && (
                    <span className="material-symbols-sharp animate-spin text-base! leading-none!">
                      progress_activity
                    </span>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
