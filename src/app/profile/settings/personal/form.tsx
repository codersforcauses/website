"use client"

import * as React from "react"
import { z } from "zod"

import { authClient } from "~/lib/auth-client"
import { PRONOUNS, UNIVERSITIES } from "~/lib/constants"
import { Button } from "~/ui/button"
import { Checkbox } from "~/ui/checkbox"
import { FormDescription, FormField, FormLabel, FormMessage, useAppForm } from "~/ui/form"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group"
import { Switch } from "~/ui/switch"

const formSchema = z
  .object({
    name: z.string().min(1, {
      error: "Name is required",
    }),
    preferredName: z.string().min(1, {
      error: "Preferred name is required",
    }),
    email: z.email({
      error: ({ input }) => (input === "" ? "Email is required" : "Invalid email address"),
    }),
    pronouns: z.string().min(1, {
      error: "Pronouns are required",
    }),
    isUWA: z.boolean(),
    studentNumber: z.string(),
    uni: z.string(),
    subscribe: z.boolean(),
  })
  .refine(({ isUWA, studentNumber }) => !Boolean(isUWA) || studentNumber, {
    error: "Student number is required",
    path: ["studentNumber"],
  })
  .refine(({ isUWA, studentNumber = "" }) => !Boolean(isUWA) || studentNumber.length === 8, {
    error: "Student number must be 8 digits long",
    path: ["studentNumber"],
  })
  .refine(({ isUWA, uni = "" }) => Boolean(isUWA) || uni !== "", {
    error: "University is required",
    path: ["uni"],
  })

type FormSchema = z.infer<typeof formSchema>

export default function PersonalForm(props: { defaultValues?: Partial<FormSchema> }) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const form = useAppForm({
    defaultValues: props.defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value: { isUWA, ...value } }) {
      // TODO: add email change
      const { data, error } = await authClient.updateUser({
        // email: value.email,
        name: value.name,
        preferredName: value.preferredName,
        pronouns: value.pronouns,
        studentNumber: isUWA ? value.studentNumber : null,
        university: isUWA ? null : value.uni,
        subscribe: value.subscribe,
      })
      if (error) {
        if (error.code === "USER_ALREADY_EXISTS") {
          // TODO: handle this better
        } else if (error.code === "FAILED_TO_CREATE_USER") {
          // TODO: handle this better
          console.log("Exists error:", error)
        } else {
          // TODO: handle different error cases
          console.log("Create error:", error)
        }
      }

      // if (data) {
      //   setOpenVerification(true)
      // }
    },
  })
  return (
    <form
      className="grid max-w-xl gap-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        btnRef.current?.focus()
        await form.handleSubmit()
      }}
    >
      <form.AppField name="email">
        {(field) => (
          <field.FormItem>
            <FormLabel>Email address</FormLabel>
            <FormField>
              <Input
                autoFocus
                type="email"
                autoComplete="email"
                placeholder="john.doe@codersforcauses.org"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormField>
            <FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField name="name">
        {(field) => (
          <field.FormItem>
            <FormLabel>Full name</FormLabel>
            <FormField>
              <Input
                autoComplete="name"
                placeholder="John Doe"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormField>
            <FormDescription>
              We use your full name for internal committee records and official correspondence
            </FormDescription>
            <FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField name="preferredName">
        {(field) => (
          <field.FormItem>
            <FormLabel>Preferred name</FormLabel>
            <FormField>
              <Input
                autoComplete="given-name"
                placeholder="John"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormField>
            <FormDescription>This is how we normally refer to you</FormDescription>
            <FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField name="pronouns">
        {(field) => (
          <div className="grid gap-y-1.5">
            <Label className={`font-mono ${field.state.meta.isValid ? "" : "text-red-500"}`}>Pronouns</Label>
            <RadioGroup
              onValueChange={field.handleChange}
              defaultValue={field.state.value}
              onBlur={field.handleBlur}
              className="grid grid-cols-2 sm:grid-cols-3"
            >
              {PRONOUNS.map(({ label, value }) => (
                <field.FormItem key={value} className="flex h-6 items-center space-y-0">
                  <FormField>
                    <RadioGroupItem value={value} />
                  </FormField>
                  <FormLabel className="font-sans font-normal">{label}</FormLabel>
                </field.FormItem>
              ))}
              <field.FormItem className="flex h-6 items-center space-y-0">
                <FormField>
                  <RadioGroupItem value="" />
                </FormField>
                {Boolean(PRONOUNS.find(({ value: val }) => val === field.state.value)) ? (
                  <FormLabel className="font-sans font-normal">Other</FormLabel>
                ) : (
                  <Input
                    autoFocus
                    placeholder="Other pronouns"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className="h-8 w-full"
                  />
                )}
              </field.FormItem>
            </RadioGroup>
            {!field.state.meta.isValid && <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>}
          </div>
        )}
      </form.AppField>
      <form.AppField name="isUWA">
        {(field) => (
          <field.FormItem className="inline-flex">
            <FormField>
              <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
            </FormField>
            <FormLabel>I am a UWA student</FormLabel>
          </field.FormItem>
        )}
      </form.AppField>
      <form.Subscribe selector={(state) => state.values.isUWA}>
        {/* prefer css hidden states over ternary to preserve state */}
        {(isUWA) => (
          <>
            <form.AppField name="studentNumber">
              {(field) => (
                <field.FormItem className={isUWA ? "" : "hidden"}>
                  <FormLabel>UWA student number</FormLabel>
                  <FormField>
                    <Input
                      placeholder="21012345"
                      inputMode="numeric"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
                  </FormField>
                  <FormDescription>This is how we normally refer to you</FormDescription>
                  <FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name="uni">
              {(field) => (
                <div className={isUWA ? "hidden" : "grid gap-y-1.5"}>
                  <Label className={`font-mono ${field.state.meta.isValid ? "" : "text-red-500"}`}>University</Label>
                  <RadioGroup
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                    onBlur={field.handleBlur}
                    className="grid grid-cols-2 sm:grid-cols-3"
                  >
                    {UNIVERSITIES.map(({ label, value }) => (
                      <field.FormItem key={value} className="flex h-6 items-center space-y-0">
                        <FormField>
                          <RadioGroupItem value={value} />
                        </FormField>
                        <FormLabel className="font-sans font-normal">{label}</FormLabel>
                      </field.FormItem>
                    ))}
                    <field.FormItem className="flex h-6 items-center space-y-0">
                      <FormField>
                        <RadioGroupItem value="" />
                      </FormField>
                      {Boolean(UNIVERSITIES.find(({ value: val }) => val === field.state.value)) ? (
                        <FormLabel className="font-sans font-normal">Other</FormLabel>
                      ) : (
                        <Input
                          autoFocus
                          placeholder="Other university"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            field.handleChange(e.target.value)
                          }}
                          className="h-8 w-full"
                        />
                      )}
                    </field.FormItem>
                  </RadioGroup>
                  {!field.state.meta.isValid && <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>}
                </div>
              )}
            </form.AppField>
          </>
        )}
      </form.Subscribe>

      <form.AppField name="subscribe">
        {(field) => (
          <field.FormItem className="inline-flex items-center">
            <FormField>
              <Checkbox
                checked={field.state.value}
                onCheckedChange={(e) => {
                  field.handleChange(Boolean(e))
                }}
              />
            </FormField>
            <FormLabel className="font-sans text-sm font-normal">
              I wish to receive emails about future CFC events
            </FormLabel>
          </field.FormItem>
        )}
      </form.AppField>

      <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
        {([isSubmitting, canSubmit]) => (
          <Button ref={btnRef} type="submit" disabled={isSubmitting ?? !canSubmit} className="relative w-full">
            {isSubmitting ? "Waiting for email verification" : "Update"}
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
