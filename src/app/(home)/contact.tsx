"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/ui/textarea"
import { toast } from "~/hooks/use-toast"
import { Field, FieldError, FieldLabel } from "~/ui/field"

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
  const [count, setCount] = React.useState(0)
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
      toast({
        title: "We've received your message",
        // description: "Your query has been submitted to us, we will get back to you as soon as we can.",
        description: `Your query has been submitted to us, we will get back to you as soon as we can. ${count}`,
      })
      setCount((prev) => prev + 1)
      // }
      // } catch (error) {
      //   console.log("Error sending message:", error)

      //   toast({
      //     variant: "destructive",
      //     title: "Failed to send message",
      //     description: "Your message was unable to be sent, please try again.",
      //   })
      // }
    },
  })

  const close = React.useCallback(() => {
    setOpen(false)
    form.reset()
  }, [form])

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {!open && (
        <CollapsibleTrigger asChild>
          <Button variant="outline-dark">Contact us</Button>
        </CollapsibleTrigger>
      )}
      <AnimatePresence>
        {open && (
          <CollapsibleContent asChild forceMount>
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
                className="mt-4 grid max-w-xl gap-y-4"
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
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          id="name"
                          name="name"
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
                        <FieldLabel htmlFor="org_name">
                          Organization name
                          <span className="opacity-75">(optional)</span>
                        </FieldLabel>
                        <Input
                          id="org_name"
                          name="org_name"
                          variant="dark"
                          autoComplete="organization"
                          placeholder="Coders for causes"
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
                <form.Field name="email">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field>
                        <FieldLabel htmlFor="email">Email address</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          variant="dark"
                          type="text"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="hello@codersforcauses.org"
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
                <form.Field name="message">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field>
                        <FieldLabel htmlFor="message">Message</FieldLabel>
                        <Textarea
                          id="message"
                          name="message"
                          variant="dark"
                          placeholder="Write a short message here to get things started"
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
                <div className="grid grid-cols-2 gap-4">
                  <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
                    {([isSubmitting, canSubmit]) => (
                      <Button
                        ref={btnRef}
                        type="submit"
                        variant="dark"
                        disabled={isSubmitting ?? !canSubmit}
                        className="relative order-1 w-full"
                      >
                        {isSubmitting ? "Sending" : "Send"}
                        {isSubmitting && (
                          <span className="material-symbols-sharp absolute right-4 animate-spin text-base! leading-none!">
                            progress_activity
                          </span>
                        )}
                      </Button>
                    )}
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
