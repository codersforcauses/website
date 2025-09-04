"use client"

import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@vercel/analytics/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { siDiscord } from "simple-icons"
import * as z from "zod"

// import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
// import GithubHeatmap from "../_components/github-heatmap"
import OnlinePaymentForm from "~/components/payment/online"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { toast } from "~/components/ui/use-toast"

import { PRONOUNS, UNIVERSITIES } from "~/lib/constants"
import { cn, getIsMembershipOpen } from "~/lib/utils"
import { type User } from "~/server/db/types"
import { api } from "~/trpc/react"

import DetailsBlock from "../details"
import PaymentBlock from "../payment"

type ActiveView = "form" | "payment"

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name is required",
    }),
    preferred_name: z.string().min(2, {
      message: "Preferred name is required",
    }),
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .min(2, {
        message: "Email is required",
      }),
    pronouns: z.string().min(2, {
      message: "Pronouns are required",
    }),
    isUWA: z.boolean(),
    student_number: z.string().optional(),
    uni: z.string().optional(),
    github: z.string().optional(),
    discord: z.string().optional(),
    subscribe: z.boolean(),
  })
  .refine(({ isUWA, student_number }) => !Boolean(isUWA) || student_number, {
    message: "Student number is required",
    path: ["student_number"],
  })
  .refine(({ isUWA, student_number = "" }) => !Boolean(isUWA) || /^\d{8}$/.test(student_number), {
    message: "Student number must be 8 digits",
    path: ["student_number"],
  })
  .refine(({ isUWA, uni = "" }) => Boolean(isUWA) || uni || uni === "other", {
    message: "University is required",
    path: ["uni"],
  })

type FormSchema = z.infer<typeof formSchema>

const defaultValues = {
  name: "",
  preferred_name: "",
  pronouns: PRONOUNS[0].value,
  isUWA: true,
  student_number: "",
  uni: UNIVERSITIES[0].value,
  github: "",
  discord: "",
  subscribe: true,
}

export default function CompleteProfile() {
  const [activeView, setActiveView] = React.useState<ActiveView>("form")
  const [loadingSkipPayment, setLoadingSkipPayment] = React.useState(false)
  const [user, setUser] = React.useState<User>()
  const router = useRouter()

  const { isLoaded, user: clerkUser } = useUser()
  const [step, setStep] = React.useState<"submitForm" | "verifying">("submitForm")
  if (!isLoaded) return null

  const clerk_id = clerkUser?.id
  const email = clerkUser?.primaryEmailAddress?.emailAddress ?? ""
  const name = clerkUser?.firstName ? `${clerkUser.firstName} ${clerkUser.lastName ?? ""}`.trim() : ""
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      email: email,
      name: name,
    },
  })
  const { getValues, setError } = form

  const utils = api.useUtils()
  const createUser = api.users.create.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create database user",
        description: error.message,
      })
    },
  })
  const { data: cards } = api.payments.getCards.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity, // this is ok because this will be the first time ever the user will fetch cards, no risk of it being out of date
  })

  const onSubmit = async (values: FormSchema) => {
    if (!isLoaded) return

    if (values.github !== "") {
      const { status: githubStatus } = await fetch(`https://api.github.com/users/${values.github}`)

      if (githubStatus !== 200) {
        toast({
          variant: "destructive",
          title: "Github username not found",
          description: "The Github username not found. Please try again.",
        })
        setError("github", {
          type: "custom",
          message: "Github username not found",
        })
        return
      }
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    })
    setStep("verifying")
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("created-account")

    const userData: Omit<FormSchema, "isUWA"> = {
      name: values.name,
      preferred_name: values.preferred_name,
      email: values.email,
      pronouns: values.pronouns,
      github: values.github,
      discord: values.discord,
      subscribe: values.subscribe,
    }

    if (values.isUWA) {
      userData.student_number = values.student_number
      userData.uni = "UWA"
    } else {
      userData.uni = values.uni
    }

    try {
      if (clerkUser)
        await clerkUser.update({
          firstName: values.name, // Use full name as first name
          unsafeMetadata: {
            preferred_name: values.preferred_name,
            pronouns: values.pronouns,
            github: values.github,
            discord: values.discord,
            subscribe: values.subscribe,
            university: values.uni,
            student_number: values.student_number,
          },
        })

      const user = await createUser.mutateAsync({
        clerk_id: clerk_id ?? "",
        ...userData,
      })
      setUser(user)

      setActiveView("payment")
    } catch (error) {
      console.error("Signup error", error)
      toast({
        variant: "destructive",
        title: "Failed to create user",
        description: `An error occurred while trying to create user. ${(error as { message?: string })?.message ?? ""}`,
      })
    }
  }

  const handleAfterOnlinePayment = async (paymentID: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Unable to verify user",
        description: "We were unable to verify if the user was created.",
      })
      return
    }

    user.role = "member"
    utils.users.getCurrent.setData(undefined, user)
    router.push("/dashboard")
  }

  const handleSkipPayment = async () => {
    if (user) {
      setLoadingSkipPayment(true)
      try {
        utils.users.getCurrent.setData(undefined, user)
        router.push("/dashboard")
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingSkipPayment(false)
      }
    }
  }

  return (
    <div className="container grid gap-x-8 gap-y-4 py-12 md:grid-cols-2 md:gap-y-8 lg:gap-x-16">
      <Alert className="md:col-span-2">
        <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
        {activeView === "form" ? (
          step === "submitForm" ? (
            <>
              <AlertTitle>New user detected!</AlertTitle>
              <AlertDescription>
                We couldn&apos;t find an account with that email address so you can create a new account here. If you
                think it was a mistake,{" "}
                <Button variant="link" className="h-auto p-0">
                  <Link replace href="/join">
                    click here to go back
                  </Link>
                </Button>
              </AlertDescription>
            </>
          ) : (
            <>
              <AlertTitle>Creating your account...</AlertTitle>
              <AlertDescription>Thanks for your patience! We are creating your account.</AlertDescription>
            </>
          )
        ) : (
          <>
            <AlertTitle>User created!</AlertTitle>
            <AlertDescription>
              Now you can proceed to payment or skip for now and complete later from your dashboard.
            </AlertDescription>
          </>
        )}
      </Alert>
      <Form {...form}>
        {activeView === "form" ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-semibold leading-none tracking-tight">Personal details</h2>
              <p className="text-sm text-muted-foreground">Fields marked with * are required.</p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-1 font-mono">
                    <p>Email address</p>
                    <p className="font-sans">*</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@codersforcauses.org" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-1 font-mono">
                    <p>Full name</p> <p className="font-sans">*</p>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    We use your full name for internal committee records and official correspondence
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-1 font-mono">
                    <p>Preferred name</p>
                    <p className="font-sans">*</p>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="given-name" placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>This is how we normally refer to you</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-1 font-mono">
                    <p>Pronouns</p>
                    <p className="font-sans">*</p>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 sm:grid-cols-3"
                    >
                      {PRONOUNS.map(({ label, value }) => (
                        <FormItem key={value} className="flex h-6 items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      ))}
                      <FormItem className="flex h-6 items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        {Boolean(PRONOUNS.find(({ value: val }) => val === field.value)) ? (
                          <FormLabel className="font-normal">Other</FormLabel>
                        ) : (
                          <FormControl>
                            <Input {...field} placeholder="Other pronouns" className="h-8" />
                          </FormControl>
                        )}
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-y-4">
              <FormField
                control={form.control}
                name="isUWA"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-mono">I&apos;m a UWA student</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="student_number"
                render={({ field }) => (
                  <FormItem className={cn(!getValues().isUWA && "hidden")}>
                    <FormLabel className="flex space-x-1 font-mono">
                      <p>UWA student number</p>
                      <p className="font-sans">*</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="21012345" inputMode="numeric" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uni"
                render={({ field }) => (
                  <FormItem className={cn(getValues().isUWA && "hidden")}>
                    <FormLabel className="font-mono">University</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid sm:grid-cols-2"
                      >
                        {UNIVERSITIES.map(({ label, value }) => (
                          <FormItem key={value} className="flex h-6 items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-normal">{label}</FormLabel>
                          </FormItem>
                        ))}
                        <FormItem className="flex h-6 items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          {Boolean(UNIVERSITIES.find(({ value: val }) => val === field.value)) ? (
                            <FormLabel className="font-normal">Other university</FormLabel>
                          ) : (
                            <FormControl>
                              <Input placeholder="Other university" {...field} className="h-8" />
                            </FormControl>
                          )}
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:gap-x-3">
              <div className="space-y-2 sm:col-span-2">
                <h2 className="font-semibold leading-none tracking-tight">Socials</h2>
                <p className="text-sm text-muted-foreground">
                  These fields are optional but are required if you plan on applying for projects during the winter and
                  summer breaks.
                </p>
                <Alert>
                  <svg viewBox="0 0 24 24" width={16} height={16} className="mr-2 fill-current">
                    <title>{siDiscord.title}</title>
                    <path d={siDiscord.path} />
                  </svg>
                  <AlertTitle>Join our Discord!</AlertTitle>
                  <AlertDescription>
                    You can join our Discord server at{" "}
                    <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                      <Link href="http://discord.codersforcauses.org" target="_blank">
                        discord.codersforcauses.org
                      </Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Github username</FormLabel>
                    <FormControl>
                      <Input placeholder="john_doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Sign up at{" "}
                      <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                        <Link href="https://github.com/signup" target="_blank">
                          github.com/signup
                        </Link>
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Discord username</FormLabel>
                    <FormControl>
                      <Input placeholder="john_doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Sign up at{" "}
                      <Button type="button" variant="link" className="h-auto p-0 text-current" asChild>
                        <Link href="https://discord.com/register" target="_blank">
                          discord.com/register
                        </Link>
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subscribe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm">I wish to receive emails about future CFC events</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="relative w-full">
              Submit
            </Button>
          </form>
        ) : (
          <DetailsBlock />
        )}
      </Form>
      {activeView === "payment" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="font-semibold leading-none tracking-tight">Payment</h2>
            <div className="text-sm text-muted-foreground">
              <p>
                Become a paying member of Coders for Causes for just $5 a year (ends on 31st Dec{" "}
                {new Date().getFullYear()}). There are many benefits to becoming a member which include:
              </p>
              <ul className="list-inside list-disc">
                <li>discounts to paid events such as industry nights</li>
                <li>the ability to vote and run for committee positions</li>
                <li>the ability to join our projects run during the winter and summer breaks.</li>
              </ul>
            </div>
          </div>
          {getIsMembershipOpen() ? (
            <>
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
                  <p className="text-sm text-muted-foreground">
                    Our online payment system is handled by{" "}
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link href="https://squareup.com/au/en" target="_blank">
                        Square
                      </Link>
                    </Button>
                    . We do not store your card details but we do record the information Square provides us after
                    confirming your card.
                  </p>
                  <OnlinePaymentForm cards={cards} afterPayment={handleAfterOnlinePayment} />
                </TabsContent>
                <TabsContent value="in-person" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    We accept cash and card payments in-person. We use{" "}
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link href="https://squareup.com/au/en" target="_blank">
                        Square&apos;s
                      </Link>
                    </Button>{" "}
                    Point-of-Sale terminals to accept card payments. Reach out to a committee member via our Discord or
                    a CFC event to pay in-person. A committee member will update your status as a member on payment
                    confirmation.
                  </p>
                  <Button className="w-full" onClick={handleSkipPayment}>
                    I&apos;ve paid in cash
                  </Button>
                </TabsContent>
              </Tabs>
              <div className="relative select-none">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-sm font-semibold leading-none tracking-tight">Skipping payment</h2>
                <div className="text-sm text-muted-foreground">
                  <p>
                    You can skip payment for now but you will miss out on the benefits mentioned above until you do. You
                    can always pay later by going to your account dashboard.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                disabled={loadingSkipPayment}
                className="relative w-full"
                onClick={handleSkipPayment}
              >
                Skip payment
                {loadingSkipPayment && (
                  <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>
                )}
              </Button>
            </>
          ) : (
            <p className="text-sm text-warning">
              Memberships are temporarily closed for the new year. Please check back later.
            </p>
          )}
        </div>
      ) : (
        <PaymentBlock />
      )}
      {/* <div className="hidden w-full border border-border md:block">
          <div className="relative h-40 bg-black border-b border-muted">
            <div className="container">
              <Avatar
                size="lg"
                className="absolute bottom-0 translate-y-1/2 border-4 border-muted"
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="container">
            <div className="mt-10">
              <p className="text-lg font-bold">{getValues().name}</p>
              <p className="text-sm text-muted-foreground">
                {getValues().email}
              </p>
            </div>
            <GithubHeatmap username={user_github ?? ""} />
          </div>
        </div> */}
    </div>
  )
}
