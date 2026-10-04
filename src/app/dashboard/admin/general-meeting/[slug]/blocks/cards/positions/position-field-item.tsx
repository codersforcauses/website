"use client"

import { useSortable } from "@dnd-kit/react/sortable"
// import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
// import { RestrictToElement } from "@dnd-kit/dom/modifiers"
import * as z from "zod"

import { cn } from "~/lib/utils"
import { useIsMobile } from "~/hooks/use-mobile"
import { Button } from "~/ui/button"
import { Field, FieldError, FieldLabel } from "~/ui/field"
import { Input } from "~/ui/input"
import { Textarea } from "~/ui/textarea"
import { type formSchema, useFieldContext, withFieldGroup } from "./utils"

const PositionFieldItem = withFieldGroup({
  defaultValues: {
    id: "",
    title: "",
    openings: 1,
    description: "",
  },
  props: {
    id: "id",
    index: 0,
    loading: false,
  },
  render: function Render({ group, id, index, loading }) {
    const isMobile = useIsMobile()
    const { handleRef, ref, isDragging } = useSortable({
      id,
      index,
      // modifiers: [
      //   // RestrictToVerticalAxis,
      //   // RestrictToElement.configure({
      //   //   element() {
      //   //     return document.querySelector("[data-positions]")
      //   //   },
      //   // }),
      // ],
    })
    const field = useFieldContext<z.infer<typeof formSchema>["positions"]>()
    return (
      <div ref={ref} className="group/drag-n-drop relative flex gap-4 bg-background pt-4">
        <div
          className={cn(
            "absolute inset-0 bottom-auto flex justify-between select-none",
            !isMobile && "invisible group-hover/drag-n-drop:visible",
            isDragging && "visible border-t-4 border-border",
          )}
        >
          <span />
          <div ref={handleRef} className="cursor-move">
            <span className="material-symbols-sharp rotate-90 text-base! leading-none! text-muted-foreground">
              drag_indicator
            </span>
          </div>
          <Button
            type="button"
            variant="ghost-destructive"
            size="icon-xs"
            disabled={loading}
            onClick={() => {
              field.removeValue(index)
            }}
          >
            <span className="material-symbols-sharp text-sm!">delete</span>
          </Button>
        </div>
        <div className="relative z-1 grid flex-1 grid-cols-3 gap-4">
          <group.AppField name="title">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid} className="col-span-2">
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
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
          <group.AppField name="openings">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Openings</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="1"
                    aria-invalid={isInvalid}
                    inputMode="numeric"
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.valueAsNumber)
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </group.AppField>
          <group.AppField name="description">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid} className="col-span-3">
                  <FieldLabel htmlFor={field.name}>
                    Description <span className="text-muted-foreground">(optional)</span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Short description about the position"
                    aria-invalid={isInvalid}
                    className="min-h-12"
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
        </div>
      </div>
    )
  },
})

export default PositionFieldItem
