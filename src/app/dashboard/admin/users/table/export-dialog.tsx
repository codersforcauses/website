import * as React from "react"
import { useForm } from "@tanstack/react-form"
import z from "zod"

import { api } from "~/trpc/react"
import { Button } from "~/ui/button"
import { Checkbox } from "~/ui/checkbox"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Spinner } from "~/ui/spinner"

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
  const [loading, startTransition] = React.useTransition()
  const { mutateAsync } = api.admin.users.exportUsers.useMutation()

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
        <form.AppField name="all">
          {(field) => (
            <field.FormItem className="inline-flex items-center">
              <FormField>
                <Checkbox
                  disabled={loading}
                  checked={field.state.value || "indeterminate"}
                  onCheckedChange={(e) => {
                    field.handleChange(Boolean(e))
                  }}
                />
              </FormField>
              <FormLabel className="font-sans text-sm font-medium">Select all</FormLabel>
            </field.FormItem>
          )}
        </form.AppField>
        <div className="grid gap-1 pl-5">
          {formSchema
            .omit({ role: true })
            .keyof()
            .options.map((col) => (
              <form.AppField key={col} name={col}>
                {(field) => (
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
                )}
              </form.AppField>
            ))}
          <form.AppField name="role">
            {(field) => (
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
            )}
          </form.AppField>
          <div className="grid grid-cols-2 gap-1 pl-5">
            {formSchema.shape.role.keyof().options.map((role) => (
              <form.AppField key={role} name={role}>
                {(field) => (
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
                )}
              </form.AppField>
            ))}
          </div>
        </div>
        <DialogFooter className="col-span-full mt-3">
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button
                // ref={btnRef}
                type="submit"
                disabled={loading ?? !canSubmit}
                className="relative w-full"
              >
                Export
                {loading && <Spinner className="absolute right-4" />}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
