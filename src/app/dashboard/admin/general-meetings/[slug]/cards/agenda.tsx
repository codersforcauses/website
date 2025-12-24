"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"
import { Button } from "~/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/ui/field"
import { Spinner } from "~/ui/spinner"
import { Textarea } from "~/ui/textarea"

interface AgendaCardProps {
  className?: string
}

const formSchema = z.object({
  agenda: z.string(),
})

export default function AgendaCard({ className, ...props }: AgendaCardProps) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setText] = React.useState("Save")
  // const { mutateAsync } = api.user.checkIfExists.useMutation()
  const [loading, startTransition] = React.useTransition()
  const form = useForm({
    defaultValues: {
      agenda: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      // setText("Checking if email exists")
      startTransition(async () => {
        // const userExists = await mutateAsync(value.email)
        // if (userExists) {
        //   setText("Sending code to email")
        // } else {
        //   setText("Redirecting to sign up")
        // }
      })
    },
  })

  return (
    <form
      className={cn("flex w-full flex-col gap-y-4 bg-white p-6 dark:bg-neutral-950", className)}
      onSubmit={(e) => {
        e.preventDefault()
        btnRef.current?.focus()
        void form.handleSubmit()
      }}
    >
      <FieldSet className="h-full">
        <FieldLegend variant="label">Meeting agenda</FieldLegend>
        <FieldDescription>This will be viewable to everyone attending the meeting</FieldDescription>
        <FieldGroup className="h-full">
          <form.Field name="agenda">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid} className="h-full">
                  {/* <FieldLabel htmlFor={field.name}>Email address</FieldLabel> */}
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Write something here with markdown"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    disabled={loading}
                    className="h-full"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </FieldSet>

      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <Button ref={btnRef} type="submit" disabled={loading ?? !canSubmit} className="relative">
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
  )
}
