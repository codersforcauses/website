"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { AnimatePresence, motion } from "motion/react"

import { api } from "~/trpc/react"
import { authClient } from "~/lib/auth-client"
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert"
import { Button } from "~/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/ui/input"
import { Spinner } from "~/ui/spinner"
import VerificationDialog from "./verification"

const formSchema = z.object({
  email: z.email({
    error: ({ input }) => (input === "" ? "Email is required" : "Invalid email address"),
  }),
})

export default function JoinPage() {
  const router = useRouter()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const { mutateAsync } = api.user.checkIfExists.useMutation()
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
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    placeholder="john.doe@codersforcauses.org"
                    disabled={loading}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>

        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button ref={btnRef} type="submit" disabled={loading ?? !canSubmit} className="relative w-full">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={btnText}
                  transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  initial={{ opacity: 0, y: -36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 36 }}
                >
                  {btnText}
                </motion.span>
              </AnimatePresence>
              {loading && <Spinner className="absolute right-4" />}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <VerificationDialog email={form.state.values.email} open={openVerification} onOpenChange={setOpenVerification} />
    </>
  )
}
