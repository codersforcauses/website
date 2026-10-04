"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import SubmitButton from "~/blocks/submit-button"
import { Button } from "~/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/ui/collapsible"
import { Field, FieldError, FieldLabel } from "~/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "~/ui/input-group"
import { toastManager } from "~/ui/toast"

const formSchema = z.object({
  name: z.string().min(2, {
    error: "Name is required.",
  }),
  org_name: z.string(),
  email: z.email({
    error: ({ input }) => (input === "" ? "Email is required" : "Invalid email address"),
  }),
  message: z.string().min(10, {
    error: "Message is not long enough, please write a longer message.",
  }),
})

export default function Contact() {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement>(null)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      org_name: "",
      message: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid() {
      const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement
      InvalidInput?.focus()
    },
    async onSubmit({ value }) {
      // change loading to use transition
      // try {
      // const response = await fetch("https://formspree.io/mrgyryzj", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   mode: "cors",
      //   body: JSON.stringify(value),
      // })
      // if (response.ok) {
      //   form.reset()
      // setOpen(false)
      toastManager.add({
        title: "We've received your message",
        description: "Your query has been submitted to us, we will get back to you as soon as we can.",
        type: "success",
      })
      // }
      // } catch (error) {
      //   console.log("Error sending message:", error)
      // toastManager.add({
      //   title: "Failed to send message",
      //   description: "Your message failed to send, please try again.",
      //   type: "error",
      // })
      // }
    },
  })

  const close = React.useCallback(() => {
    setOpen(false)
    form.reset()
  }, [form])

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {!open && <CollapsibleTrigger render={<Button variant="outline-dark">Contact us</Button>} />}
      <AnimatePresence>
        {open && (
          <CollapsibleContent animate={false}>
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                transform: "scaleY(1)",
                originY: 0,
                transition: { ease: ["easeIn", "easeOut"] },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transform: "scaleY(0)",
              }}
            >
              <form
                className="grid gap-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  btnRef.current?.focus()
                  await form.handleSubmit()
                }}
              >
                <form.Field name="name">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <InputGroup variant="dark">
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            autoFocus
                            variant="dark"
                            autoComplete="name"
                            placeholder="John Doe"
                            aria-invalid={isInvalid}
                            value={field.state.value}
                            onBlur={field.handleBlur}
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
                <form.Field name="org_name">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Organization name
                          <span className="opacity-75">(optional)</span>
                        </FieldLabel>
                        <InputGroup variant="dark">
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            variant="dark"
                            autoComplete="organization"
                            placeholder="Coders for causes"
                            value={field.state.value}
                            onBlur={field.handleBlur}
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
                <form.Field name="email">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                        <InputGroup variant="dark">
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            variant="dark"
                            type="text"
                            inputMode="email"
                            autoComplete="email"
                            aria-invalid={isInvalid}
                            placeholder="hello@codersforcauses.org"
                            value={field.state.value}
                            onBlur={field.handleBlur}
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
                <form.Field name="message">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                        <InputGroup variant="dark">
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            variant="dark"
                            aria-invalid={isInvalid}
                            placeholder="Write a short message here to get things started"
                            value={field.state.value}
                            onBlur={field.handleBlur}
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
                <div className="grid grid-cols-2 gap-4">
                  <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
                    {([isSubmitting, canSubmit]) => {
                      const btnText = isSubmitting ? "Sending" : "Send"
                      return (
                        <SubmitButton
                          ref={btnRef}
                          disabled={isSubmitting ?? !canSubmit}
                          loading={isSubmitting ?? false}
                          variant="dark"
                          className="order-1"
                        >
                          {btnText}
                        </SubmitButton>
                      )
                    }}
                  </form.Subscribe>

                  <Button variant="ghost-dark" type="button" className="order-0" onClick={close}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible>
  )
}
