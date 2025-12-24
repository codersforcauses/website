"use client"

import * as React from "react"
import { z } from "zod"
import { formOptions, useForm } from "@tanstack/react-form"
import { AnimatePresence, motion } from "motion/react"
import { DragDropProvider } from "@dnd-kit/react"
import { useSortable } from "@dnd-kit/react/sortable"
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import { RestrictToElement } from "@dnd-kit/dom/modifiers"

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
import { Input } from "~/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Spinner } from "~/ui/spinner"
import { Switch } from "~/ui/switch"
import { DEFAULT_QUESTIONS } from "~/lib/defaults"

interface QuestionCardProps {
  className?: string
}

interface QuestionItemProps {
  index: number
  id: string
  loading?: boolean
}

const questionType = ["short", "long", "checkbox"] as const

const formSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string().min(1, "Question text is required"),
      type: z.enum(questionType),
      required: z.boolean(),
    }),
  ),
})

const formOpts = formOptions({
  defaultValues: {
    questions: DEFAULT_QUESTIONS,
  },
  validators: {
    onSubmit: formSchema,
  },
})

function QuestionItem({ id, index, loading = false }: QuestionItemProps) {
  const form = useForm(formOpts)
  const { handleRef, ref } = useSortable({
    id,
    index,
    modifiers: [
      RestrictToVerticalAxis,
      RestrictToElement.configure({
        element() {
          return document.querySelector("[data-container]")
        },
      }),
    ],
  })
  return (
    <div ref={ref} className="group/drag-n-drop relative flex gap-4 bg-neutral-50/75 p-4 dark:bg-neutral-900/25">
      <div
        ref={handleRef}
        className="invisible absolute top-0 left-1/2 -translate-x-1/2 cursor-move px-4 select-none group-hover/drag-n-drop:visible"
      >
        <span className="material-symbols-sharp rotate-90 text-base! leading-none! text-neutral-500 dark:text-neutral-400">
          drag_indicator
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <form.Field name={`questions[${index}].text`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="col-span-2">
                <FieldLabel htmlFor={field.name}>Text</FieldLabel>
                <Input
                  name={field.name}
                  value={field.state.value}
                  placeholder="President"
                  aria-invalid={isInvalid}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name={`questions[${index}].type`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                <Select name={field.name} value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="short">Short answer</SelectItem>
                    <SelectItem value="long">Paragraph</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <div className="col-span-3 flex justify-between gap-x-3">
          <form.Field name={`questions[${index}].required`}>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field orientation="horizontal" data-invalid={isInvalid} className="w-fit">
                  <FieldLabel htmlFor={field.name}>Required</FieldLabel>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                  />
                </Field>
              )
            }}
          </form.Field>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={loading}
            className="hover:text-red-400 dark:hover:text-red-600"
            onClick={() => {
              form.removeFieldValue("questions", index)
            }}
          >
            <span className="material-symbols-sharp text-base! leading-none!">delete</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function QuestionsCard({ className, ...props }: QuestionCardProps) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setText] = React.useState("Save")
  // const { mutateAsync } = api.user.checkIfExists.useMutation()
  const [loading, startTransition] = React.useTransition()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const form = useForm({
    ...formOpts,
    onSubmit({ value }) {
      console.log(value.questions)

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

  const handleAddQuestion = React.useCallback(() => {
    form.pushFieldValue("questions", {
      text: "",
      type: "short",
      required: true,
    })
  }, [form])

  return (
    <form
      className={cn("grid w-full gap-4 bg-white p-6 dark:bg-neutral-950", className)}
      onSubmit={(e) => {
        e.preventDefault()
        btnRef.current?.focus()
        void form.handleSubmit()
      }}
    >
      <FieldSet>
        <FieldLegend variant="label">Questions for candidates</FieldLegend>
        <FieldDescription>Modify the positions available and how many openings are available.</FieldDescription>
        <Button size="sm" variant="secondary" onClick={handleAddQuestion}>
          <span className="material-symbols-sharp text-base! leading-none!">add</span>
          Add
          <span className="hidden md:block">question</span>
        </Button>
        <form.Field name="questions" mode="array">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <DragDropProvider
                onDragEnd={({ operation, canceled }) => {
                  const { source } = operation

                  if (canceled || !source || !("index" in source && typeof source.index === "number")) return

                  const sourceIndex = field.state.value.findIndex(({ text }) => text === source.id) // get original index of dragged item
                  const projectedSourceIndex = source.index // get index of where item was dropped

                  if (projectedSourceIndex === sourceIndex || sourceIndex === -1) return

                  field.moveValue(sourceIndex, projectedSourceIndex)
                }}
              >
                <FieldGroup data-container>
                  {field.state.value.map((val, index) => (
                    <QuestionItem key={index} index={index} id={val.text} loading={loading} />
                  ))}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldGroup>
              </DragDropProvider>
            )
          }}
        </form.Field>
      </FieldSet>
      {/* <div className="flex justify-between">
        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button type="reset" variant="outline" disabled={loading ?? !canSubmit} className="relative">
              Reset
            </Button>
          )}
        </form.Subscribe> */}
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
      {/* </div> */}
    </form>
  )
}
