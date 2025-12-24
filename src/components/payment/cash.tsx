"use client"

import * as React from "react"
import { z } from "zod"

import { Button } from "~/ui/button"
import { FormDescription, FormField, FormLabel, FormMessage, useAppForm } from "~/ui/form"
import { Input } from "~/ui/input"

const formSchema = z.object({
  code: z.string(),
})

export default function CashPayment() {
  const form = useAppForm({
    defaultValues: {
      code: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      // await props.afterPayment?.("paymentID");
    },
  })

  return (
    <form>
      <form.AppField name="code">
        {(field) => (
          <field.FormItem>
            <FormLabel>
              Confirmation code <span className="opacity-75">*</span>
            </FormLabel>
            <FormField>
              <Input
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormField>
            <FormDescription>
              To verify your payment, have a committee member enter the confirmation code.
            </FormDescription>
            <FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
        {([isSubmitting, canSubmit]) => (
          <Button type="submit" disabled={isSubmitting ?? !canSubmit} className="relative w-full">
            Confirm
            {isSubmitting && (
              <span className="material-symbols-sharp absolute right-4 animate-spin text-base! leading-none!">
                progress_activity
              </span>
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
