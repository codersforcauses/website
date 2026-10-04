"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { useUploadFile } from "@better-upload/client"

import { cn } from "~/lib/utils"
import { authClient } from "~/lib/auth-client"
import { PRONOUNS, UNIVERSITIES } from "~/lib/constants"
import SubmitButton from "~/blocks/submit-button"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { buttonVariants } from "~/ui/button"
import { Checkbox } from "~/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { Field, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from "~/ui/field"
import { Input } from "~/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "~/ui/input-group"
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group"
import { Switch } from "~/ui/switch"

const formSchema = z
  .object({
    image: z.string().trim(),
    name: z.string().trim().min(1, {
      error: "Name is required",
    }),
    preferredName: z.string().trim().min(1, {
      error: "Preferred name is required",
    }),
    email: z.email({
      error: ({ input }) => (String(input).trim() === "" ? "Email is required" : "Invalid email address"),
    }),
    pronouns: z.string().trim().min(1, {
      error: "Pronouns are required",
    }),
    bio: z.string().trim(),
    isUWA: z.boolean(),
    studentNumber: z.string().trim(),
    uni: z.string().trim(),
    subscribe: z.boolean(),
  })
  .refine(({ isUWA, studentNumber }) => !isUWA || studentNumber, {
    error: "Student number is required",
    path: ["studentNumber"],
  })
  .refine(({ isUWA, studentNumber }) => !isUWA || studentNumber.length === 8, {
    error: "Student number must be 8 digits long",
    path: ["studentNumber"],
  })
  .refine(({ isUWA, uni }) => Boolean(isUWA) || uni !== "", {
    error: "University is required",
    path: ["uni"],
  })

type FormSchema = z.infer<typeof formSchema>

export default function PersonalForm(props: { defaultValues?: Partial<FormSchema> }) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const uploader = useUploadFile({
    route: "form",
    onUploadComplete: ({ file }) => {
      form.setFieldValue("image", file.objectInfo.key)
    },
  })
  const form = useForm({
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
      className="flex flex-col gap-4 gap-x-8 md:flex-row-reverse"
      onSubmit={async (e) => {
        e.preventDefault()
        btnRef.current?.focus()
        await form.handleSubmit()
      }}
    >
      <div className="flex-1">
        <form.Field name="image">
          {(field) => {
            const isInvalid = (field.state.meta.isTouched && !field.state.meta.isValid) || uploader.isError
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Profile image</FieldLabel>
                <div className="relative pb-3">
                  <Avatar className="size-36!">
                    {/* {isInvalid && <span className="material-symbols-sharp text-destructive">error</span>} */}
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="" />
                    <AvatarFallback className="text-3xl uppercase">
                      {props.defaultValues?.preferredName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id={field.name}
                      className={cn(buttonVariants({ variant: "secondary", size: "xs" }), "absolute bottom-0")}
                    >
                      Edit
                      <span className="material-symbols-sharp text-xs! leading-none!">edit</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <span className="material-symbols-sharp text-xs! leading-none!">add_photo_alternate</span>
                          Upload image
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            field.handleChange("")
                          }}
                        >
                          <span className="material-symbols-sharp text-xs! leading-none!">delete</span>
                          Remove photo
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </div>
      <div className="grid w-full max-w-xl gap-y-4">
        <form.Field name="email">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="john.doe@codersforcauses.org"
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onBlur={field.handleBlur}
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
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    autoComplete="name"
                    placeholder="John Doe"
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
                  We use your full name for internal committee records and official correspondence
                </FieldDescription>
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="preferredName">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Preferred name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    autoComplete="given-name"
                    placeholder="John"
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
                <FieldDescription>This is how we normally refer to you</FieldDescription>
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="pronouns">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <FieldSet>
                <FieldLegend variant="label" className="font-mono font-medium">
                  Pronouns
                </FieldLegend>
                <RadioGroup
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  onBlur={field.handleBlur}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 [&>div]:h-6"
                >
                  {PRONOUNS.map(({ label, value }) => (
                    <Field key={value} orientation="horizontal" data-invalid={isInvalid}>
                      <RadioGroupItem id={label} value={value} aria-invalid={isInvalid} />
                      <FieldLabel htmlFor={label} className="font-sans font-normal">
                        {label}
                      </FieldLabel>
                    </Field>
                  ))}
                  <Field orientation="horizontal">
                    <RadioGroupItem id="other-gender" value="" aria-invalid={isInvalid} />
                    {PRONOUNS.find(({ value: val }) => val === field.state.value) ? (
                      <FieldLabel htmlFor="other-gender" className="font-sans font-normal">
                        Other
                      </FieldLabel>
                    ) : (
                      <Input
                        autoFocus
                        id="other-pronouns"
                        name="other-pronouns"
                        placeholder="Other pronouns"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                        }}
                        className="h-8 w-full"
                      />
                    )}
                  </Field>
                </RadioGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </FieldSet>
            )
          }}
        </form.Field>
        <form.Field name="bio">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Bio <span className="text-muted-foreground">(optional)</span>
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    placeholder="John Doe"
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
                {/* <FieldDescription>
                We use your full name for internal committee records and official correspondence
              </FieldDescription> */}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="isUWA">
          {(field) => (
            <Field orientation="horizontal">
              <Switch id="isUWA" checked={field.state.value} onCheckedChange={field.handleChange} />
              <FieldLabel htmlFor="isUWA">I am a UWA student</FieldLabel>
            </Field>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.values.isUWA}>
          {/* prefer css hidden states over ternary to preserve state */}
          {(isUWA) => (
            <>
              <form.Field name="studentNumber">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className={isUWA ? "" : "hidden"}>
                      <FieldLabel htmlFor={field.name}>UWA student number</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          placeholder="21012345"
                          inputMode="numeric"
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
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name="uni">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <FieldSet className={isUWA ? "hidden" : "grid gap-y-1.5"}>
                      <FieldLegend variant="label" className="font-mono font-medium">
                        University
                      </FieldLegend>
                      <RadioGroup
                        id={field.name}
                        name={field.name}
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        onBlur={field.handleBlur}
                        className="grid grid-cols-2 sm:grid-cols-3 [&>div]:h-6"
                      >
                        {UNIVERSITIES.map(({ label, value }) => (
                          <Field key={value} orientation="horizontal" data-invalid={isInvalid}>
                            <RadioGroupItem id={label} value={value} aria-invalid={isInvalid} />
                            <FieldLabel htmlFor={label} className="font-sans font-normal">
                              {label}
                            </FieldLabel>
                          </Field>
                        ))}
                        <Field orientation="horizontal" data-invalid={isInvalid}>
                          <RadioGroupItem id="other-uni" value="" aria-invalid={isInvalid} />
                          {UNIVERSITIES.find(({ value: val }) => val === field.state.value) ? (
                            <FieldLabel htmlFor="other-uni" className="font-sans font-normal">
                              Other
                            </FieldLabel>
                          ) : (
                            <Input
                              autoFocus
                              id="other-university"
                              name="other-university"
                              placeholder="Other university"
                              aria-invalid={isInvalid}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                field.handleChange(e.target.value)
                              }}
                              className="h-8 w-full"
                            />
                          )}
                        </Field>
                      </RadioGroup>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </FieldSet>
                  )
                }}
              </form.Field>
            </>
          )}
        </form.Subscribe>
        <form.Field name="subscribe">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field orientation="horizontal" data-invalid={isInvalid}>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  checked={field.state.value}
                  onCheckedChange={(e) => {
                    field.handleChange(Boolean(e))
                  }}
                />
                <FieldLabel htmlFor={field.name} className="font-sans text-sm font-normal">
                  I wish to receive emails about future CFC events
                </FieldLabel>
              </Field>
            )
          }}
        </form.Field>
        <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
          {([isSubmitting, canSubmit]) => {
            const btnText = isSubmitting ? "Waiting for email verification" : "Update"
            return (
              <SubmitButton ref={btnRef} disabled={isSubmitting ?? !canSubmit} loading={isSubmitting ?? false}>
                {btnText}
              </SubmitButton>
            )
          }}
        </form.Subscribe>
      </div>
    </form>
  )
}
