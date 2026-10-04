"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"

import { useApi } from "~/trpc/react"
import { authClient } from "~/lib/auth-client"
import SubmitButton from "~/blocks/submit-button"
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert"
import { Field, FieldError, FieldGroup, FieldLabel } from "~/ui/field"
import { Input } from "~/ui/input"
import VerificationDialog from "./verification"

const formSchema = z.object({
  email: z.email({
    error: ({ input }) => (input === "" ? "Email is required" : "Invalid email address"),
  }),
})

export default function JoinPage() {
  const { user } = useApi()
  const router = useRouter()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const { mutateAsync } = useMutation(user.checkIfExists.mutationOptions())
  const [btnText, setText] = React.useState("Continue")
  const [loading, startTransition] = React.useTransition()
  const [openVerification, setOpenVerification] = React.useState(false)
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      setText("Checking if email exists")
      startTransition(async () => {
        const userExists = await mutateAsync(value.email)

        if (userExists) {
          setText("Sending code to email")
          await authClient.emailOtp.sendVerificationOtp(
            {
              email: value.email,
              type: "sign-in",
            },
            {
              onSuccess() {
                setText("Continue")
                setOpenVerification(true)
              },
              // onError({ error }) {
              //   console.log("join error:", error);
              // },
            },
          )
        } else {
          setText("Redirecting to sign up")
          router.replace(`/create-account?email=${value.email}`)
        }
      })
    },
  })

  return (
    <>
      <form
        className="grid gap-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          btnRef.current?.focus()
          void form.handleSubmit()
        }}
      >
        <Alert>
          <span aria-hidden className="material-symbols-sharp">
            info
          </span>
          <AlertTitle>Welcome!</AlertTitle>
          <AlertDescription>
            No passwords here! Enter your email, and we&apos;ll email you a code to sign in or bring you to the sign up
            page.
          </AlertDescription>
        </Alert>
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                  <Input
                    autoFocus
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    placeholder="john.doe@codersforcauses.org"
                    inputMode="email"
                    disabled={loading}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>

        <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
          {([isSubmitting, canSubmit]) => (
            <SubmitButton
              ref={btnRef}
              disabled={(isSubmitting || loading) ?? !canSubmit}
              loading={isSubmitting || loading}
            >
              {btnText}
            </SubmitButton>
          )}
        </form.Subscribe>
      </form>

      <VerificationDialog email={form.state.values.email} open={openVerification} onOpenChange={setOpenVerification} />
    </>
  )
}
