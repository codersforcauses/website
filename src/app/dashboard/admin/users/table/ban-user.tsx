import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { authClient } from "~/lib/auth-client"
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/ui/alert-dialog"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { Label } from "~/ui/label"
import { Field, FieldError, FieldLabel } from "~/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Spinner } from "~/ui/spinner"
import { Switch } from "~/ui/switch"

interface BanUserProps {
  name: string
  userId: string
  refetchData: () => Promise<void>
}

const DURATION = [
  { label: "hours", value: "1" },
  { label: "days", value: "24" },
  { label: "months", value: (24 * 30).toString() },
  { label: "years", value: (24 * 365).toString() },
]

const formSchema = z
  .object({
    reason: z.string().min(1, {
      error: "Ban reason is required",
    }),
    len: z.string(),
    duration: z.string(),
    indefinite: z.boolean(),
  })
  .refine(({ indefinite, len, duration }) => indefinite || (!!len && !!duration), {
    // TODO: verify
    error: "Ban length is required",
    path: ["duration"],
  })

export default function BanUser({ name, userId, refetchData }: BanUserProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [loading, setTransition] = React.useTransition()
  const form = useForm({
    defaultValues: {
      reason: "",
      len: "",
      duration: "",
      indefinite: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      setTransition(async () => {
        await authClient.admin.banUser({
          userId,
          banReason: value.reason,
          banExpiresIn: value.indefinite ? undefined : 60 * 60 * Number(value.len) * Number(value.duration),
        })
        await refetchData()
      })
    },
  })
  return (
    <AlertDialogContent
      onOpenAutoFocus={(e) => {
        e.preventDefault()
        inputRef.current?.focus()
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Ban {name}</AlertDialogTitle>
        <AlertDialogDescription>
          Banning a user prevents them from using the site for the duration set.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form
        className="grid gap-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
      >
        <form.Field name="reason">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Ban reason</FieldLabel>
                <Input
                  ref={inputRef}
                  placeholder="Spamming"
                  disabled={loading}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <div className="space-y-1.5">
          <Label className="font-mono">Ban length</Label>
          <div className="flex max-w-sm items-center justify-between gap-2">
            <div className="flex gap-0.5">
              <form.Field name="len">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="sr-only">Ban time</FieldLabel>

                      <Input
                        placeholder="7"
                        inputMode="numeric"
                        disabled={loading}
                        value={field.state.value}
                        className="w-20"
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                        }}
                      />

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name="duration">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="sr-only">Ban duration</FieldLabel>

                      <Select
                        defaultValue={field.state.value}
                        onValueChange={(val) => {
                          field.handleChange(val)
                        }}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue placeholder="days" />
                        </SelectTrigger>
                        <SelectContent className="w-(--radix-select-trigger-width)">
                          {DURATION.map((duration) => (
                            <SelectItem key={duration.label} value={duration.value}>
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">OR</div>
            <form.Field name="indefinite">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center gap-1.5">
                      <Switch
                        defaultChecked={field.state.value}
                        onCheckedChange={(val) => {
                          field.handleChange(val)
                        }}
                      />
                      <FieldLabel>Indefinite</FieldLabel>
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button type="submit" disabled={loading ?? !canSubmit} variant="destructive">
                Ban user
                {loading && <Spinner />}
              </Button>
            )}
          </form.Subscribe>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  )
}
