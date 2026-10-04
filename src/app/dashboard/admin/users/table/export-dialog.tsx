import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import z from "zod"

import { useApi } from "~/trpc/react"
import { Checkbox } from "~/ui/checkbox"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Field, FieldError, FieldLabel } from "~/ui/field"
import SubmitButton from "~/blocks/submit-button"

const formSchema = z.object({
  id: z.boolean(),
  name: z.boolean(),
  preferredName: z.boolean(),
  email: z.boolean(),
  emailVerified: z.boolean(),
  // image: z.boolean(),
  pronouns: z.boolean(),
  studentNumber: z.boolean(),
  university: z.boolean(),
  github: z.boolean(),
  discord: z.boolean(),
  subscribe: z.boolean(),
  squareCustomerId: z.boolean(),
  createdAt: z.boolean(),
  updatedAt: z.boolean(),

  // admin plugin
  banned: z.boolean(),
  banReason: z.boolean(),
  banExpires: z.boolean(),
  role: z.object({
    nonMembers: z.boolean(),
    members: z.boolean(),
    hlm: z.boolean(),
    past: z.boolean(),
    committee: z.boolean(),
    admin: z.boolean(),
    returningOfficer: z.boolean(),
  }),
})

export default function ExportDialog() {
  const { admin } = useApi()
  const [loading, startTransition] = React.useTransition()
  const { mutateAsync } = useMutation(admin.users.exportUsers.mutationOptions())

  const form = useForm({
    // defaultValues: fields.reduce(
    //   (obj, curr) => ({
    //     ...obj,
    //     [curr]: true,
    //   }),
    //   {},
    // ),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      startTransition(() => {
        console.log(value)
      })
    },
  })
  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Export users</DialogTitle>
        <DialogDescription>Select columns to export</DialogDescription>
      </DialogHeader>
      <form
        className="grid gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          // btnRef.current?.focus()
          void form.handleSubmit()
        }}
      >
        <form.Field name="all">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  disabled={loading}
                  checked={field.state.value || "indeterminate"}
                  aria-invalid={isInvalid}
                  onCheckedChange={(e) => {
                    field.handleChange(e)
                  }}
                />
                <FieldLabel htmlFor={field.name} className="font-sans text-sm font-medium">
                  Select all
                </FieldLabel>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <div className="grid gap-1 pl-5">
          {formSchema
            .omit({ role: true })
            .keyof()
            .options.map((col) => (
              <form.Field key={col} name={col}>
                {/* {(field) => (
                  <field.FormItem className="inline-flex items-center">
                    <FormField>
                      <Checkbox
                        disabled={loading}
                        checked={Boolean(field.state.value)}
                        onCheckedChange={(e) => {
                          field.handleChange(Boolean(e))
                        }}
                      />
                    </FormField>
                    <FormLabel className="font-sans text-sm font-normal">{col}</FormLabel>
                  </field.FormItem>
                )} */}
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        disabled={loading}
                        checked={field.state.value}
                        aria-invalid={isInvalid}
                        onCheckedChange={(e) => {
                          field.handleChange(e)
                        }}
                      />
                      <FieldLabel htmlFor={field.name} className="font-sans text-sm font-medium">
                        {col}
                      </FieldLabel>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            ))}
          <form.Field name="role">
            {/* {(field) => (
              <field.FormItem className="inline-flex items-center">
                <FormField>
                  <Checkbox
                    disabled={loading}
                    checked={Boolean(field.state.value)}
                    onCheckedChange={(e) => {
                      field.handleChange(Boolean(e))
                    }}
                  />
                </FormField>
                <FormLabel className="font-sans text-sm font-normal">role</FormLabel>
              </field.FormItem>
            )} */}
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    disabled={loading}
                    checked={field.state.value}
                    aria-invalid={isInvalid}
                    onCheckedChange={(e) => {
                      field.handleChange(e)
                    }}
                  />
                  <FieldLabel htmlFor={field.name} className="font-sans text-sm font-medium">
                    role
                  </FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <div className="grid grid-cols-2 gap-1 pl-5">
            {formSchema.shape.role.keyof().options.map((role) => (
              <form.Field key={role} name={role}>
                {/* {(field) => (
                  <field.FormItem className="inline-flex items-center">
                    <FormField>
                      <Checkbox
                        disabled={loading}
                        checked={Boolean(field.state.value)}
                        onCheckedChange={(e) => {
                          field.handleChange(Boolean(e))
                        }}
                      />
                    </FormField>
                    <FormLabel className="font-sans text-sm font-normal">{role}</FormLabel>
                  </field.FormItem>
                )} */}
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        disabled={loading}
                        checked={field.state.value}
                        aria-invalid={isInvalid}
                        onCheckedChange={(e) => {
                          field.handleChange(e)
                        }}
                      />
                      <FieldLabel htmlFor={field.name} className="font-sans text-sm font-medium">
                        {role}
                      </FieldLabel>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            ))}
          </div>
        </div>
        <DialogFooter className="col-span-full mt-3">
          <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
            {([isSubmitting, canSubmit]) => {
              const btnText = "Export"
              return (
                <SubmitButton
                  // ref={btnRef}
                  disabled={(isSubmitting || loading) ?? !canSubmit}
                  loading={isSubmitting || loading}
                >
                  {btnText}
                </SubmitButton>
              )
            }}
          </form.Subscribe>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
