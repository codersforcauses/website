import * as React from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { authClient } from "~/lib/auth-client"
import SubmitButton from "~/blocks/submit-button"
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/ui/alert-dialog"
import { ButtonGroup } from "~/ui/button-group"
import { Input } from "~/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/ui/input-group"
import { Field, FieldError, FieldLabel, FieldLegend, FieldSet } from "~/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
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
    <AlertDialogContent initialFocus={inputRef}>
      <AlertDialogHeader>
        <AlertDialogTitle>Ban {name}</AlertDialogTitle>
        <AlertDialogDescription>
          Banning a user prevents them from using the site for the duration set.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
      >
        <div className="grid gap-y-4">
          <form.Field name="reason">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Ban reason</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    ref={inputRef}
                    placeholder="Spamming"
                    disabled={loading}
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
          <FieldSet>
            <FieldLegend variant="label" className="font-mono">
              Ban length
            </FieldLegend>
            <div className="flex max-w-sm items-center justify-between gap-2">
              <ButtonGroup id="ban_length">
                <form.Field name="len">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="sr-only">
                          Ban time
                        </FieldLabel>
                        <InputGroup variant="dark">
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            placeholder="7"
                            inputMode="numeric"
                            disabled={loading}
                            aria-invalid={isInvalid}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            className="max-w-24"
                            onChange={(e) => {
                              field.handleChange(e.target.value)
                            }}
                          />
                          {isInvalid && (
                            <InputGroupAddon align="inline-end">
                              <span className="material-symbols-sharp text-destructive-dark">error</span>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
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
                        <FieldLabel htmlFor={field.name} className="sr-only">
                          Ban duration
                        </FieldLabel>
                        <Select
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          items={DURATION}
                          onValueChange={(val) => {
                            field.handleChange(val!)
                          }}
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue placeholder="days" />
                          </SelectTrigger>
                          <SelectContent alignItemWithTrigger>
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
              </ButtonGroup>
              <div className="text-xs text-muted-foreground">OR</div>
              <form.Field name="indefinite">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid} className="w-fit">
                      <Switch
                        id={field.name}
                        name={field.name}
                        // size="sm"
                        checked={field.state.value}
                        onCheckedChange={(val) => {
                          field.handleChange(val)
                        }}
                      />
                      <FieldLabel htmlFor={field.name} className="font-sans">
                        Indefinite
                      </FieldLabel>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>
          </FieldSet>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
            {([isSubmitting, canSubmit]) => {
              const btnText = "Ban user"
              return (
                <SubmitButton
                  disabled={(isSubmitting || loading) ?? !canSubmit}
                  loading={(isSubmitting || loading) ?? false}
                  variant="destructive"
                >
                  {btnText}
                </SubmitButton>
              )
            }}
          </form.Subscribe>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  )
}
