"use client"

import * as React from "react"
import { useMutation } from "@tanstack/react-query"
import { DragDropProvider } from "@dnd-kit/react"
import * as z from "zod"

import { useApi } from "~/trpc/react"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { FieldError, FieldGroup } from "~/ui/field"
import SubmitButton from "~/blocks/submit-button"
import QuestionFieldItem from "./question-field-item"
import { formSchema, useAppForm } from "./utils"

export default function EditQuestionsDialog({ id, questions }: z.infer<typeof formSchema> & { id: string }) {
  const { admin } = useApi()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setText] = React.useState("Save")
  const [loading, startTransition] = React.useTransition()
  const { mutate } = useMutation(
    admin.generalMeetings.questions.updateForMeeting.mutationOptions({
      onSettled() {
        setText("Save")
      },
    }),
  )

  const form = useAppForm({
    defaultValues: {
      questions,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      startTransition(async () => {
        setText("Saving")
        console.log("hello")

        // TODO: Check if there are items and warn about changes
        // mutate({
        //   meetingId: id,
        //   questions: value.questions.map((pos, i) => ({
        //     ...pos,
        //     order: i,
        //   })),
        // })
      })
    },
  })

  const handleAddQuestion = React.useCallback(() => {
    form.pushFieldValue("questions", {
      id: `ques:${crypto.randomUUID()}`,
      text: "",
      type: "short",
      required: true,
    })
  }, [form])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        btnRef.current?.focus()
        void form.handleSubmit()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit questions for candidates</DialogTitle>
          <DialogDescription>
            Modify the questions candidates must answer to nominate themselves for a position.
          </DialogDescription>
        </DialogHeader>
        {/* <Button size="sm" variant="secondary" onClick={handleAddQuestion}>
          <span className="material-symbols-sharp text-base! leading-none! font-bold!">add</span>
          <span className="inline-flex">
            Add
            <span className="hidden md:block">&nbsp;question</span>
          </span>
        </Button> */}
        <div className="no-scrollbar -mx-4 max-h-[75vh] overflow-y-auto px-4">
          <form.AppField name="questions" mode="array">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <DragDropProvider
                  onDragEnd={({ operation, canceled }) => {
                    const { source } = operation

                    if (canceled || !source || !("index" in source && typeof source.index === "number")) return

                    const sourceIndex = field.state.value.findIndex(({ id }) => id === source.id) // get original index of dragged item
                    const projectedSourceIndex = source.index // get index of where item was dropped

                    if (projectedSourceIndex === sourceIndex || sourceIndex === -1) return

                    field.moveValue(sourceIndex, projectedSourceIndex)
                  }}
                >
                  <FieldGroup>
                    {field.state.value.map((val, index) => (
                      <QuestionFieldItem
                        key={index}
                        index={index}
                        form={form}
                        id={val.id}
                        loading={loading}
                        fields={{
                          id: `questions[${index}].id`,
                          text: `questions[${index}].text`,
                          type: `questions[${index}].type`,
                          required: `questions[${index}].required`,
                        }}
                      />
                    ))}
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldGroup>
                </DragDropProvider>
              )
            }}
          </form.AppField>
        </div>
        <DialogFooter>
          <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
            {([isSubmitting, canSubmit]) => (
              <SubmitButton
                ref={btnRef}
                disabled={(isSubmitting || loading) ?? !canSubmit}
                loading={(isSubmitting || loading) ?? false}
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
