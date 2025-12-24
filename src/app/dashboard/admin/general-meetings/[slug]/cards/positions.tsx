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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "~/ui/field"
import { Spinner } from "~/ui/spinner"
import { Input } from "~/ui/input"
import { Textarea } from "~/ui/textarea"
import { DEFAULT_POSITIONS } from "~/lib/defaults"

interface PositionsCardProps {
  className?: string
}

interface PositionItemProps {
  index: number
  id: string
  loading?: boolean
}

const formSchema = z.object({
  positions: z.array(
    z.object({
      title: z.string().min(1, "Position title is required"),
      openings: z.number().min(1, "There must be at least one opening"),
      description: z.string(),
    }),
  ),
})

const formOpts = formOptions({
  defaultValues: {
    positions: DEFAULT_POSITIONS,
  },
  validators: {
    onSubmit: formSchema,
  },
})

function PositionItem({ id, index, loading = false }: PositionItemProps) {
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
      <div className="invisible absolute top-0 -left-9 bg-white p-0.5 group-hover/drag-n-drop:visible dark:bg-neutral-950">
        <div className="bg-neutral-50/75 dark:bg-neutral-900/25">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={loading}
            className="hover:text-red-400 dark:hover:text-red-600"
            onClick={() => {
              form.removeFieldValue("positions", index)
            }}
          >
            <span className="material-symbols-sharp text-base! leading-none!">delete</span>
          </Button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        <form.Field name={`positions[${index}].title`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="col-span-2">
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
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
        <form.Field name={`positions[${index}].openings`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Openings</FieldLabel>
                <Input
                  name={field.name}
                  value={field.state.value}
                  placeholder="1"
                  aria-invalid={isInvalid}
                  inputMode="numeric"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name={`positions[${index}].description`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="col-span-3">
                <FieldLabel htmlFor={field.name}>
                  Description <span className="text-neutral-500 dark:text-neutral-400">(optional)</span>
                </FieldLabel>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  placeholder="Short description about the position"
                  aria-invalid={isInvalid}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </div>
    </div>
  )
}

export default function PositionsCard({ className, ...props }: PositionsCardProps) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setText] = React.useState("Create positions")
  // const { mutateAsync } = api.user.checkIfExists.useMutation()
  const [loading, startTransition] = React.useTransition()
  const form = useForm({
    ...formOpts,
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

  const handleAddPosition = React.useCallback(() => {
    form.pushFieldValue("positions", {
      title: "",
      openings: 1,
      description: "",
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
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <FieldLegend variant="label">Positions available</FieldLegend>
            <FieldDescription>Modify the positions available and how many openings are available.</FieldDescription>
          </div>
          <Button size="sm" variant="secondary" onClick={handleAddPosition}>
            <span className="material-symbols-sharp text-base! leading-none!">add</span>
            Add
            <span className="hidden md:block">position</span>
          </Button>
        </div>
        <form.Field name="positions" mode="array">
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
                    <PositionItem key={index} index={index} id={val.title} loading={loading} />
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
