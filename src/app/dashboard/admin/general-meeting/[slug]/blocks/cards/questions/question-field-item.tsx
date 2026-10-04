"use client"

import { useSortable } from "@dnd-kit/react/sortable"
// import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
// import { RestrictToElement } from "@dnd-kit/dom/modifiers"
import * as z from "zod"

import { useIsMobile } from "~/hooks/use-mobile"
import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"
import { Field, FieldError, FieldLabel } from "~/ui/field"
import { Input } from "~/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Switch } from "~/ui/switch"
import { type formSchema, useFieldContext, withFieldGroup } from "./utils"

const questionTypeOptions = [
  {
    label: "Short answer",
    value: "short",
  },
  {
    label: "Paragraph",
    value: "long",
  },
  {
    label: "Checkbox",
    value: "checkbox",
  },
]

const QuestionFieldItem = withFieldGroup({
  defaultValues: {
    id: "",
    text: "",
    type: "short",
    required: true,
  },
  props: {
    id: "id",
    index: 0,
    loading: false,
  },
  render: function Render({ group, id, index, loading }) {
    const isMobile = useIsMobile()
    const { handleRef, ref } = useSortable({
      id,
      index,
      // modifiers: [
      //   // RestrictToVerticalAxis,
      //   // RestrictToElement.configure({
      //   //   element() {
      //   //     return document.querySelector("[data-questions]")
      //   //   },
      //   // }),
      // ],
    })
    const field = useFieldContext<z.infer<typeof formSchema>["questions"]>()
    return (
      <div ref={ref} className="group/drag-n-drop relative flex gap-4 bg-background pt-4">
        <div
          ref={handleRef}
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 cursor-move px-4 select-none",
            !isMobile && "invisible group-hover/drag-n-drop:visible",
          )}
        >
          <span className="material-symbols-sharp rotate-90 text-base! leading-none! text-muted-foreground">
            drag_indicator
          </span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4">
          <group.AppField name="text">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid} className="col-span-3">
                  <FieldLabel htmlFor={field.name}>Text</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="President"
                    aria-invalid={isInvalid}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </group.AppField>
          <group.AppField name="type">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                  <Select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    items={questionTypeOptions}
                    onValueChange={(value) => {
                      field.handleChange(value!)
                    }}
                  >
                    <SelectTrigger aria-invalid={isInvalid}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypeOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </group.AppField>
          <div className="flex justify-between gap-x-3">
            <group.AppField name="required">
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
            </group.AppField>
            <Button
              type="button"
              variant="ghost-destructive"
              size="icon-sm"
              disabled={loading}
              onClick={() => {
                field.removeValue(index)
              }}
            >
              <span className="material-symbols-sharp text-base! leading-none!">delete</span>
            </Button>
          </div>
        </div>
      </div>
    )
  },
})

export default QuestionFieldItem
