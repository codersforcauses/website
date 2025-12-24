"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { siDiscord } from "simple-icons"
import { AnimatePresence, motion } from "motion/react"

import { authClient } from "~/lib/auth-client"
import { PRONOUNS, UNIVERSITIES } from "~/lib/constants"
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert"
import { Button } from "~/ui/button"
import { Checkbox } from "~/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from "~/ui/field"
import { Input } from "~/ui/input"
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group"
import { Scrollspy } from "~/components/ui/scrollspy"
import { Switch } from "~/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import VerificationDialog from "./verification"

type ActiveView = "form" | "payment"

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
    github: z.string(),
    discord: z.string(),
    subscribe: z.boolean(),
  })
  .refine(({ isUWA, studentNumber }) => !isUWA || studentNumber, {
    error: "Student number is required",
    path: ["studentNumber"],
  })
  .refine(({ isUWA, studentNumber = "" }) => !isUWA || studentNumber.length === 8, {
    error: "Student number must be 8 digits long",
    path: ["studentNumber"],
  })
  .refine(({ isUWA, uni = "" }) => Boolean(isUWA) || uni !== "", {
    error: "University is required",
    path: ["uni"],
  })

const currentYear = new Date().getFullYear()

export default function CreateAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data, refetch } = authClient.useSession()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const parentRef = React.useRef<HTMLDivElement>(null)
  const [activeView, setActiveView] = React.useState<ActiveView>("form")
  const [openVerification, setOpenVerification] = React.useState(false)
  const [loadingSkipPayment, setSkipPaymentTransition] = React.useTransition()
  const form = useForm({
    defaultValues: {
      email: searchParams.get("email") ?? "",
      name: "",
      preferredName: "",
      pronouns: PRONOUNS[0].value as string,
      isUWA: true,
      studentNumber: "",
      uni: UNIVERSITIES[0].value as string,
      github: "",
      discord: "",
      subscribe: true,
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value: { isUWA, ...value } }) {
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        name: value.name,
        preferredName: value.preferredName,
        pronouns: value.pronouns,
        studentNumber: isUWA ? value.studentNumber : null,
        university: isUWA ? null : value.uni,
        github: value.github || null,
        discord: value.discord || null,
        subscribe: value.subscribe,
        password: crypto.randomUUID(),
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

      if (data) {
        setOpenVerification(true)
      }
    },
  })

  const handleSkipPayment = () => {
    setSkipPaymentTransition(() => {
      refetch()
      router.push("/dashboard")
    })
  }

  return (
    <div className="container mx-auto flex gap-x-24 px-4 py-12 lg:gap-x-40">
      <div className="flex grow flex-col gap-y-4 lg:max-w-176" ref={parentRef}>
        <Alert>
          <span aria-label="Mail Icon" className="material-symbols-sharp">
            mail
          </span>
          <AlertTitle>New user detected!</AlertTitle>
          <AlertDescription className="block">
            We couldn&apos;t find an account with that email address so you can create a new account here. If you think
            it was a mistake,{" "}
            <Button variant="link" className="h-auto p-0">
              <Link replace href="/join" className="inline outline-none select-none">
                click here to go back
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
        <form
          className="grid gap-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            btnRef.current?.focus()
            await form.handleSubmit()
          }}
        >
          <FieldSet id="personal-details">
            <FieldLegend>Personal details</FieldLegend>
            <FieldDescription>All fields in this section are required.</FieldDescription>
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john.doe@codersforcauses.org"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
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
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="John Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
                    <FieldDescription>
                      We use your full name for internal committee records and official correspondence
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="preferredName">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="preferredName">Preferred name</FieldLabel>
                    <Input
                      id="preferredName"
                      name="preferredName"
                      autoComplete="given-name"
                      placeholder="John"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      onChange={(e) => {
                        field.handleChange(e.target.value)
                      }}
                    />
                    <FieldDescription>This is how we normally refer to you</FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                      onValueChange={field.handleChange}
                      defaultValue={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
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
                          <FieldLabel htmlFor="">UWA student number</FieldLabel>
                          <Input
                            placeholder="21012345"
                            inputMode="numeric"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            aria-invalid={isInvalid}
                            onChange={(e) => {
                              field.handleChange(e.target.value)
                            }}
                          />
                          <FieldDescription>This is how we normally refer to you</FieldDescription>
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
                            name="uni"
                            defaultValue={field.state.value}
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
                                  placeholder="Other university"
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
                </>
              )}
            </form.Subscribe>
          </FieldSet>

          <FieldSet id="social-details">
            <FieldLegend>Socials</FieldLegend>
            <FieldDescription className="text-balance">
              These fields are optional but will be required if you plan on applying for projects during the winter and
              summer university breaks.
            </FieldDescription>
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

            <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:gap-x-3">
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
                      <FieldLabel htmlFor="github">Github username</FieldLabel>
                      <Input
                        id="github"
                        name="github"
                        placeholder="john_doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                        }}
                      />
                      <FieldDescription>
                        Sign up at{" "}
                        <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                          <Link href="https://github.com/signup" target="_blank">
                            github.com/signup
                          </Link>
                        </Button>
                      </FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name="discord">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="discord">Discord username</FieldLabel>
                      <Input
                        id="discord"
                        name="discord"
                        placeholder="john_doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                        }}
                      />
                      <FieldDescription>
                        Sign up at{" "}
                        <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                          <Link href="https://discord.com/register" target="_blank">
                            discord.com/register
                          </Link>
                        </Button>
                      </FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </div>

            <form.Field name="subscribe">
              {(field) => (
                <Field orientation="horizontal">
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(e) => {
                      field.handleChange(Boolean(e))
                    }}
                  />
                  <FieldLabel className="font-sans text-sm font-normal">
                    I wish to receive emails about future CFC events
                  </FieldLabel>
                </Field>
              )}
            </form.Field>
          </FieldSet>
          <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
            {([isSubmitting, canSubmit]) => {
              const btnText = isSubmitting ? "Waiting for email verification" : "Next"
              return (
                <Button ref={btnRef} type="submit" disabled={isSubmitting ?? !canSubmit} className="relative w-full">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={btnText}
                      transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                      initial={{ opacity: 0, y: -36 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 36 }}
                    >
                      {btnText}
                    </motion.span>
                  </AnimatePresence>
                  {isSubmitting && (
                    <span className="material-symbols-sharp absolute right-4 animate-spin text-base! leading-none!">
                      progress_activity
                    </span>
                  )}
                </Button>
              )
            }}
          </form.Subscribe>
        </form>

        <FieldSet id="payment-details">
          <FieldLegend>Payment</FieldLegend>
          <div className="text-sm leading-normal font-normal text-neutral-500 dark:text-neutral-400">
            <FieldDescription className="text-balance">
              Become a paying member of Coders for Causes for just $5 a year (ends on 31st Dec {currentYear}). There are
              many benefits to becoming a member which include:
            </FieldDescription>
            <ul className="list-inside list-disc">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Tabs defaultValue="online">
              <TabsList className="w-full">
                <TabsTrigger value="online" className="w-full">
                  Online
                </TabsTrigger>
                <TabsTrigger value="in-person" className="w-full">
                  In-person
                </TabsTrigger>
              </TabsList>
              <TabsContent value="online" className="space-y-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Our online payment system is handled by{" "}
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link href="https://squareup.com/au/en" target="_blank">
                      Square
                    </Link>
                  </Button>
                  . We do not store your card details but we do record the information Square provides us after
                  confirming your card.
                </p>
                {/* <OnlinePaymentForm cards={cards} afterPayment={handleAfterOnlinePayment} /> */}
              </TabsContent>
              <TabsContent value="in-person" className="space-y-4">
                <p className="text-sm text-balance text-neutral-500 dark:text-neutral-400">
                  We accept cash and card payments in-person. We use{" "}
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link href="https://squareup.com/au/en" target="_blank">
                      Square&apos;s
                    </Link>
                  </Button>{" "}
                  Point-of-Sale terminals to accept card payments. Reach out to a committee member via our Discord or a
                  CFC event to pay in-person. A committee member will update your status as a member on payment
                  confirmation.
                </p>
              </TabsContent>
            </Tabs>
            <div className="relative select-none">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">Or</span>
              </div>
            </div>
            <FieldSet>
              <FieldLegend variant="label">Skipping payment</FieldLegend>
              <FieldDescription className="text-balance">
                You can skip payment for now but you will miss out on the benefits mentioned above until you do. You can
                always pay later by going to your account dashboard.
              </FieldDescription>
            </FieldSet>
            <Button
              variant="outline"
              disabled={loadingSkipPayment}
              className="relative w-full"
              onClick={handleSkipPayment}
            >
              Skip payment
              {loadingSkipPayment && (
                <span className="material-symbols-sharp absolute right-4 animate-spin text-base! leading-none!">
                  progress_activity
                </span>
              )}
            </Button>
          </div>
          <VerificationDialog
            email={form.state.values.email}
            open={openVerification}
            onOpenChange={setOpenVerification}
            changeActiveView={() => setActiveView("payment")}
          />
        </FieldSet>
      </div>

      <div className="hidden w-[150px] flex-col md:flex">
        <Scrollspy offset={50} targetRef={parentRef} className="sticky top-24 z-0 flex flex-col gap-2">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">On This Page</p>
          <Button
            size="sm"
            variant="ghost"
            data-scrollspy-anchor="personal-details"
            className="justify-start data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-neutral-50"
          >
            Personal details
          </Button>
          <Button
            size="sm"
            variant="ghost"
            data-scrollspy-anchor="social-details"
            className="justify-start data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-neutral-50"
          >
            Social details
          </Button>
          <Button
            size="sm"
            variant="ghost"
            data-scrollspy-anchor="payment-details"
            className="justify-start data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900 dark:data-[active=true]:bg-neutral-800 dark:data-[active=true]:text-neutral-50"
          >
            Payment details
          </Button>
        </Scrollspy>
      </div>
    </div>
  )
}
