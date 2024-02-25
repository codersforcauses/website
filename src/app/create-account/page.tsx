"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { siDiscord } from "simple-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Skeleton } from "~/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { toast } from "~/components/ui/use-toast"
// import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
// import GithubHeatmap from "../_components/github-heatmap"
import OnlinePaymentForm from "~/components/payment/online"
import { SITE_URL, PRONOUNS, UNIVERSITIES } from "~/lib/constants"
import { cn } from "~/lib/utils"
import { type User } from "~/lib/types"
import { api } from "~/trpc/react"
import { setUserCookie } from "~/app/actions"

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
  .refine(({ isUWA, student_number = "" }) => !Boolean(isUWA) || student_number.length === 8, {
    message: "Student number must be 8 digits long",
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

const DetailsBlock = () => {
  return (
    <div className="relative hidden md:block">
      <div className="absolute inset-0 z-10 -m-4 grid p-4 backdrop-blur-sm">
        <div className="flex select-none items-center place-self-center px-4 py-2">
          <span className="material-symbols-sharp text-6xl">lock</span>
          <p>Complete part 2 to join us!</p>
        </div>
      </div>
      <div aria-hidden className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold leading-none tracking-tight">Personal details</h2>
          <p className="text-sm text-muted-foreground">Fields marked with * are required.</p>
        </div>
        <div className="space-y-1.5">
          <p>Email address</p>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-1.5">
          <p>Full name</p>
          <Skeleton className="h-10 w-full" />
          <p>We use your full name for internal committee records and official correspondence</p>
        </div>
        <div className="space-y-1.5">
          <p>Preferred name</p>
          <Skeleton className="h-10 w-full" />
          <p>This is how we normally refer to you</p>
        </div>
        <div className="space-y-1.5">
          <p>Pronouns</p>
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="space-y-1.5">
          <p>UWA student number</p>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <h2 className="font-semibold leading-none tracking-tight">Socials</h2>
          <p className="text-sm text-muted-foreground">
            These fields are optional but are required if you plan on applying for projects during the winter and summer
            breaks.
          </p>
          <Alert>
            <svg viewBox="0 0 24 24" width={16} height={16} className="mr-2 fill-current">
              <title>{siDiscord.title}</title>
              <path d={siDiscord.path} />
            </svg>
            <AlertTitle>Join our Discord!</AlertTitle>
            <AlertDescription>
              You can join our Discord server at <strong>discord.codersforcauses.org</strong>
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-1.5">
            <p>Github username</p>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1.5">
            <p>Discord username</p>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Button disabled className="w-full">
          Next
        </Button>
      </div>
    </div>
  )
}
const PaymentBlock = () => {
  return (
    <div className="relative hidden md:block">
      <div className="absolute inset-0 z-10 -m-4 grid p-4 backdrop-blur-sm">
        <div className="flex select-none items-center place-self-center px-4 py-2">
          <span className="material-symbols-sharp text-6xl">lock</span>
          <p>Complete part 1 to continue to this part.</p>
        </div>
      </div>
      <div aria-hidden className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold leading-none tracking-tight">Payment</h2>
          <div className="text-sm text-muted-foreground">
            <p>
              Become a paying member of Coders for Causes for just $5 a year (ends on 31st Dec{" "}
              {new Date().getFullYear()}
              ). There are many benefits to becoming a member which include:
            </p>
            <ul className="list-inside list-disc">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Our online payment system is handled by <strong>Square</strong>. We do not store your card details but we do
          record the information Square provides us after confirming your card.
        </p>
        <Skeleton className="h-10 w-full" />
        <div>
          <div className="border border-black/25 p-4 dark:border-white/25">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="mt-8 h-[99px] w-full" />
            <Skeleton className="mt-8 h-5 w-full" />
            <Skeleton className="mt-4 h-10 w-full" />
          </div>
          <div className="border border-t-0 border-black/25 p-4 dark:border-white/25">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="border border-t-0 border-black/25 p-4 dark:border-white/25">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
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
              You can skip payment for now but you will miss out on the benefits mentioned above until you do. You can
              always pay later by going to your account dashboard.
            </p>
          </div>
        </div>
        <Button disabled variant="outline" className="w-full">
          Skip payment
        </Button>
      </div>
    </div>
  )
}

export default function CreateAccount() {
  const [activeView, setActiveView] = React.useState<ActiveView>("form")
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState<User>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, signUp, setActive } = useSignUp()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      email: searchParams.get("email") ?? "",
    },
  })
  const { getValues, setError } = form

  const utils = api.useUtils()
  const createUser = api.user.create.useMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to create account",
        description: "An error occurred while creating your account. Please try again later.",
      })
    },
  })
  const updateRole = api.user.updateRole.useMutation()

  // const user_github = getValues().github

  const onSubmit = async (values: FormSchema) => {
    if (!isLoaded) return null

    setLoading(true)
    if (values.github !== "") {
      const { status: githubStatus } = await fetch(`https://api.github.com/users/${values.github}`)

      if (githubStatus !== 200) {
        setError("github", {
          type: "custom",
          message: "Github username not found",
        })
        setLoading(false)
        return
      }
    }

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
    } else {
      userData.uni = values.uni
    }
    try {
      const { startEmailLinkFlow } = signUp.createEmailLinkFlow()
      await signUp.create({
        emailAddress: values.email,
        firstName: values.preferred_name,
        lastName: values.name, // we treat clerk.lastName as the user's full name
      })

      toast({
        title: "Email Verification Sent",
        description: "We've sent you an email with a link to verify your email address.",
      })

      const su = await startEmailLinkFlow({
        redirectUrl: `${SITE_URL}/verification`,
      })

      const user = await createUser.mutateAsync({
        clerk_id: su.createdUserId!,
        ...userData,
      })
      setUser(user)

      const verification = su.verifications.emailAddress
      if (verification.status === "expired") {
        toast({
          variant: "destructive",
          title: "Link expired",
          description: "The email verification link has expired. Please try again.",
        })
      }
      if (su.status === "complete") {
        await setActive({
          session: su.createdSessionId,
        })
      }
      setActiveView("payment")
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to create user",
        description: "An error occurred while trying to create user. Please try again later.",
      })
    } finally {
      setLoading(false)
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
    try {
      const updatedUser = await updateRole.mutateAsync({
        id: user.id,
        role: "member",
        paymentID,
      })
      await setUserCookie(updatedUser!)
      utils.user.getCurrent.setData(undefined, updatedUser)
      router.replace("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update role",
        description: "An error occurred while trying to update your role.",
      })
    }
  }

  const handleSkipPayment = async () => {
    if (user) {
      await setUserCookie(user)
      utils.user.getCurrent.setData(undefined, user)
      router.push("/dashboard")
    }
  }

  return (
    <div className="container grid gap-x-8 gap-y-4 py-8 md:grid-cols-2 md:gap-y-8 lg:gap-x-16">
      <Alert className="md:col-span-2">
        <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
        <AlertTitle>New user detected!</AlertTitle>
        <AlertDescription>
          We couldn&apos;t find an account with that email address so you can create a new account here. If you think it
          was a mistake,{" "}
          <Button variant="link" className="h-auto p-0">
            <Link replace href="/join">
              click here to go back
            </Link>
          </Button>
        </AlertDescription>
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
                    <Input type="email" placeholder="john.doe@codersforcauses.org" {...field} />
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
            <Button type="submit" disabled={loading} className="relative w-full">
              {loading ? "Waiting for email verification" : "Next"}
              {loading && (
                <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>
              )}
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
                . We do not store your card details but we do record the information Square provides us after confirming
                your card.
              </p>
              <OnlinePaymentForm afterPayment={handleAfterOnlinePayment} />
            </TabsContent>
            <TabsContent value="in-person" className="space-y-4">
              <p className="text-sm text-muted-foreground">
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
                You can skip payment for now but you will miss out on the benefits mentioned above until you do. You can
                always pay later by going to your account dashboard.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleSkipPayment}>
            Skip payment
          </Button>
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
