"use client"

import * as React from "react"
import Link from "next/link"
import { z } from "zod"
import { siDiscord } from "simple-icons"

import { authClient } from "~/lib/auth-client"
import { Button } from "~/ui/button"
import { FormDescription, FormField, FormLabel, FormMessage, useAppForm } from "~/ui/form"
import { Input } from "~/ui/input"
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert"

const formSchema = z.object({
  github: z.string(),
  discord: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export default function SocialForm(props: { defaultValues?: Partial<FormSchema> }) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const form = useAppForm({
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
        <svg viewBox="0 0 24 24" width={16} height={16}>
          <title>{siDiscord.title}</title>
          <path d={siDiscord.path} />
        </svg>
        <AlertTitle>Join our Discord!</AlertTitle>
        <AlertDescription className="inline-block">
          You can join our Discord server at{" "}
          <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
            <Link href="http://discord.codersforcauses.org" target="_blank">
              discord.codersforcauses.org
            </Link>
          </Button>
        </AlertDescription>
      </Alert>

      <form.AppField
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
        {(field) => (
          <field.FormItem>
            <FormLabel>Github username</FormLabel>
            <FormField>
              <Input
                autoFocus
                placeholder="john_doe"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormField>
            <FormDescription>
              Sign up at{" "}
              <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                <Link href="https://github.com/signup" target="_blank">
                  github.com/signup
                </Link>
              </Button>
            </FormDescription>
            <FormMessage />
          </field.FormItem>
        )}
      </form.AppField>
      <form.AppField name="discord">
        {(field) => (
          <field.FormItem>
            <FormLabel>Discord username</FormLabel>
            <FormField>
              <Input
                placeholder="john_doe"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormField>
            <FormDescription>
              Sign up at{" "}
              <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                <Link href="https://discord.com/register" target="_blank">
                  discord.com/register
                </Link>
              </Button>
            </FormDescription>
            <FormMessage />
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
