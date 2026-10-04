"use client"

import * as React from "react"
import Link from "next/link"
import * as z from "zod"
import { siDiscord } from "simple-icons"
import { useForm } from "@tanstack/react-form"

import { cn } from "~/lib/utils"
import { authClient } from "~/lib/auth-client"
import SubmitButton from "~/blocks/submit-button"
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert"
import { buttonVariants } from "~/ui/button"
import { Field, FieldDescription, FieldError, FieldLabel } from "~/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/ui/input-group"

const formSchema = z.object({
  github: z.string(),
  discord: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export default function SocialForm(props: { defaultValues?: Partial<FormSchema> }) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const form = useForm({
    defaultValues: props.defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value }) {
      const { data, error } = await authClient.updateUser({
        github: value.github,
        discord: value.discord,
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
      <Alert>
        <svg aria-hidden viewBox="0 0 24 24" width={16} height={16} className="fill-current">
          <title>{siDiscord.title}</title>
          <path d={siDiscord.path} />
        </svg>
        <AlertTitle>Join our Discord!</AlertTitle>
        <AlertDescription className="inline-block">
          You can join our Discord server at{" "}
          <Link
            href="http://discord.codersforcauses.org"
            target="_blank"
            className={cn(buttonVariants({ variant: "link" }), "-m-1 h-auto p-1 text-current")}
          >
            discord.codersforcauses.org
          </Link>
        </AlertDescription>
      </Alert>
      <form.Field
        name="github"
        validators={{
          async onSubmitAsync({ value }) {
            if (!value) return undefined
            const { status } = await fetch(`https://api.github.com/users/${value}`)
            if (status !== 200) return { message: "Github username does not exist" }
            return undefined
          },
        }}
      >
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Github username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  placeholder="john_doe"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
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
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Sign up at{" "}
                <Link
                  href="https://github.com/signup"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "link" }), "-m-1 h-auto p-1 text-current")}
                >
                  github.com/signup
                </Link>
              </FieldDescription>
            </Field>
          )
        }}
      </form.Field>
      <form.Field name="discord">
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Discord username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  placeholder="john_doe"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
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
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Sign up at{" "}
                <Link
                  href="https://discord.com/register"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "link" }), "-m-1 h-auto p-1 text-current")}
                >
                  discord.com/register
                </Link>
              </FieldDescription>
            </Field>
          )
        }}
      </form.Field>

      <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
        {([isSubmitting, canSubmit]) => {
          const btnText = isSubmitting ? "Updating" : "Update"
          return (
            <SubmitButton ref={btnRef} disabled={isSubmitting ?? !canSubmit} loading={isSubmitting ?? false}>
              {btnText}
            </SubmitButton>
          )
        }}
      </form.Subscribe>
    </form>
  )
}
