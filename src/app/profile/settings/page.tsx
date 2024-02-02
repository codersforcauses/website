"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { siDiscord } from "simple-icons"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

// move this to a shared file
const pronouns = [
  {
    label: "He/Him",
    value: "he/him",
  },
  {
    label: "She/Her",
    value: "she/her",
  },
  {
    label: "They/Them",
    value: "they/them",
  },
] as const

const uni = [
  {
    label: "Curtin University",
    value: "curtin",
  },
  {
    label: "Edith Cowan University",
    value: "ecu",
  },
  {
    label: "Murdoch University",
    value: "murdoch",
  },
  {
    label: "University of Notre Dame",
    value: "notre-dame",
  },
  {
    label: "TAFE",
    value: "tafe",
  },
] as const

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

const defaultValues: FormSchema = {
  name: "",
  preferred_name: "",
  email: "",
  pronouns: pronouns[0].value,
  isUWA: true,
  student_number: "",
  uni: uni[0].value,
  github: "",
  discord: "",
  subscribe: true,
}

export default function Settings() {
  const { data: currentUser } = api.user.getCurrent.useQuery()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const { getValues } = form

  const onSubmit = (data: FormSchema) => {
    console.log(data)
  }

  useEffect(() => {
    if (currentUser) {
      form.reset({
        ...defaultValues,
        name: currentUser.name,
        preferred_name: currentUser.preferred_name,
        email: currentUser.email,
        pronouns: currentUser.pronouns,
        isUWA: currentUser.student_number !== null,
        student_number: currentUser.student_number ?? undefined,
        uni: currentUser.university ?? undefined,
        github: currentUser.github ?? undefined,
        discord: currentUser.discord ?? undefined,
        subscribe: currentUser.subscribe,
      })
    }
  }, [form, currentUser])

  return (
    <div className="container py-8">
      <FormProvider {...form}>
        <form
          className="grid gap-x-8 gap-y-4 md:grid-cols-2 md:gap-y-8 lg:gap-x-16"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-semibold leading-none tracking-tight">Personal details</h2>
              <p className="text-sm text-muted-foreground">All fields here are required.</p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Email address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@codersforcauses.org" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Preferred name</FormLabel>
                  <FormControl>
                    <Input autoComplete="given-name" placeholder="John" {...field} />
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
                  <FormLabel className="font-mono">Full name</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Pronouns</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 sm:grid-cols-3"
                    >
                      {pronouns.map(({ label, value }) => (
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
                        {Boolean(pronouns.find(({ value: val }) => val === field.value)) ? (
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
                    <FormLabel className="font-mono">UWA student number</FormLabel>
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
                        {uni.map(({ label, value }) => (
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
                          {Boolean(uni.find(({ value: val }) => val === field.value)) ? (
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </section>
          <section className="space-y-4">
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
                      <Input placeholder="johndoe" {...field} />
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </section>
        </form>
      </FormProvider>
    </div>
  )
}
