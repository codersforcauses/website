"use client"

import * as React from "react"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { getQueryClient, useApi } from "~/trpc/react"
import { Checkbox } from "~/ui/checkbox"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "~/ui/input-group"
import SubmitButton from "~/blocks/submit-button"
import UserCombobox from "~/blocks/user-combobox"

interface AddCandidateDialogProps {
  id: string
  close: () => void
}

export default function AddCandidateDialog({ id, close }: AddCandidateDialogProps) {
  const { admin } = useApi()
  const queryClient = getQueryClient()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setText] = React.useState("Save")
  const [loading, startTransition] = React.useTransition()
  const { data: positions } = useSuspenseQuery(admin.generalMeetings.positions.listForMeeting.queryOptions(id))
  const { data: questions } = useSuspenseQuery(admin.generalMeetings.questions.listForMeeting.queryOptions(id))
  const { mutate } = useMutation(
    admin.generalMeetings.candidates.create.mutationOptions({
      async onSuccess() {
        await queryClient.invalidateQueries(admin.generalMeetings.candidates.listForMeeting.pathFilter())
        close()
      },
      onSettled() {
        setText("Save")
      },
    }),
  )

  const form = useForm({
    defaultValues: {
      candidate: {
        input: "",
        id: "",
        name: "",
        preferredName: "",
        studentNumber: "",
        role: "",
      },
      positions: [] as string[],
      answers: Object.fromEntries(questions.map((ques) => [ques.id, ques.type === "checkbox" ? false : ""])),
    },
    onSubmitInvalid() {
      const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement
      InvalidInput?.focus()
    },
    onSubmit({ value }) {
      startTransition(async () => {
        setText("Saving")

        mutate({
          userId: value.candidate.id,
          meetingId: id,
          positions: value.positions,
          answers: value.answers,
        })
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        btnRef.current?.focus()
        void form.handleSubmit()
      }}
    >
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add candidate</DialogTitle>
        </DialogHeader>
        <div className="no-scrollbar right-0 -mx-5 max-h-[75vh] overflow-y-auto px-5">
          <FieldGroup>
            <form.Field
              name="candidate"
              validators={{
                onSubmit: z
                  .object({
                    input: z.string(),
                    id: z.uuidv7(),
                    name: z.string(),
                    preferredName: z.string(),
                    studentNumber: z.string(),
                    role: z.string(),
                  })
                  .refine(({ id }) => id !== "", { error: "Candidate name is required." }),
              }}
            >
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Candidate name</FieldLabel>
                    <UserCombobox field={field} disabled={loading} filterID={id} />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="positions"
              mode="array"
              validators={{
                onSubmit: z.array(z.uuidv7()).min(1, "Please select at least one position."),
              }}
            >
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldGroup>
                    <FieldSet data-invalid={isInvalid}>
                      <FieldLegend variant="label" className="font-mono">
                        Select positions
                      </FieldLegend>
                      <FieldGroup data-slot="checkbox-group" className="grid grid-cols-2">
                        {positions.map((pos) => (
                          <Field key={pos.id} orientation="horizontal" data-invalid={isInvalid}>
                            <Checkbox
                              id={pos.id}
                              name={field.name}
                              aria-invalid={isInvalid}
                              checked={field.state.value.includes(pos.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.pushValue(pos.id)
                                } else {
                                  const index = field.state.value.indexOf(pos.id)
                                  if (index > -1) {
                                    field.removeValue(index)
                                  }
                                }
                              }}
                            />
                            <FieldLabel htmlFor={pos.id} className="font-sans font-normal">
                              {pos.title}
                            </FieldLabel>
                          </Field>
                        ))}
                      </FieldGroup>
                    </FieldSet>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldGroup>
                )
              }}
            </form.Field>
            {questions.map((ques) => (
              <form.Field
                key={ques.id}
                name={`answers.${ques.id}`}
                validators={{
                  onSubmit: ques.required
                    ? ques.type !== "checkbox"
                      ? z.string().min(1, "This field is required")
                      : undefined
                    : undefined,
                }}
              >
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} orientation={ques.type === "checkbox" ? "horizontal" : "vertical"}>
                      {ques.type === "checkbox" ? (
                        <>
                          <Checkbox
                            id={field.name}
                            name={field.name}
                            disabled={loading}
                            aria-invalid={isInvalid}
                            checked={field.state.value as boolean}
                            onCheckedChange={field.handleChange}
                          />
                          <FieldLabel htmlFor={field.name}>{ques.text}</FieldLabel>
                        </>
                      ) : ques.type === "long" ? (
                        <>
                          <FieldLabel htmlFor={field.name}>{ques.text}</FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              id={field.name}
                              name={field.name}
                              disabled={loading}
                              aria-invalid={isInvalid}
                              placeholder="Write something here"
                              value={field.state.value as string}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                field.handleChange(e.target.value)
                              }}
                            />
                            {isInvalid && (
                              <InputGroupAddon align="inline-end">
                                <span className="material-symbols-sharp text-destructive">error</span>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                        </>
                      ) : (
                        <>
                          <FieldLabel htmlFor={field.name}>{ques.text}</FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={field.name}
                              name={field.name}
                              disabled={loading}
                              aria-invalid={isInvalid}
                              placeholder="Write something here"
                              value={field.state.value as string}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                field.handleChange(e.target.value)
                              }}
                            />
                            {isInvalid && (
                              <InputGroupAddon align="inline-end">
                                <span className="material-symbols-sharp text-destructive">error</span>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                        </>
                      )}
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            ))}
          </FieldGroup>
        </div>
        <DialogFooter>
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <SubmitButton
                ref={btnRef}
                disabled={loading ?? !canSubmit}
                loading={loading}
                onClick={() => form.handleSubmit()}
              >
                {btnText}
              </SubmitButton>
            )}
          </form.Subscribe>
        </DialogFooter>
      </DialogContent>
    </form>
  )
}
