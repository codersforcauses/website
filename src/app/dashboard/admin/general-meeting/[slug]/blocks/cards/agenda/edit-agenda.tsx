"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"

import { useApi } from "~/trpc/react"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Field, FieldError } from "~/ui/field"
import { Textarea } from "~/ui/textarea"
import SubmitButton from "~/blocks/submit-button"

interface DialogProps {
  id: string
  data: string
  close: () => void
}

const formSchema = z.object({
  agenda: z.string(),
})

export default function EditAgendaDialog({ data, id, close }: DialogProps) {
  const { admin } = useApi()
  const [btnText, setText] = React.useState("Save")
  const [loading, startTransition] = React.useTransition()

  const { mutate } = useMutation(
    admin.generalMeetings.updateAgenda.mutationOptions({
      onSuccess(data) {
        // TODO: optimistic update agenda

        close()
      },
      onSettled() {
        setText("Save")
      },
    }),
  )

  const form = useForm({
    defaultValues: {
      agenda: data ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid() {
      const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement
      InvalidInput?.focus()
    },
    onSubmit({ value }) {
      startTransition(async () => {
        setText("Saving")
        mutate({
          meetingId: id,
          ...value,
        })
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit meeting agenda</DialogTitle>
          <DialogDescription>Supports markdown. (NOTE: Avoid h1 tags or single #)</DialogDescription>
        </DialogHeader>
        <form.Field name="agenda">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="h-full">
                {/* <FieldLabel htmlFor={field.name}>Email address</FieldLabel> */}
                <Textarea
                  autoFocus
                  id={field.name}
                  name={field.name}
                  placeholder="Write something here"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  disabled={loading}
                  className="h-full max-h-[60vh] min-h-96"
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <DialogFooter>
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <SubmitButton disabled={loading ?? !canSubmit} loading={loading} onClick={() => form.handleSubmit()}>
                {btnText}
              </SubmitButton>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </form>
  )
}
