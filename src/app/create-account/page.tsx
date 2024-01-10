"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Checkbox } from "~/components/ui/checkbox"
import GithubHeatmap from "../_components/github-heatmap"
import Link from "next/link"

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

const formSchema = z.object({
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
  pronouns: z.enum(pronouns.map((p) => p.value)),
  isUWA: z.boolean(),
  student_number: z.string().optional(),
  uni: z.string().optional(),
  github: z.string().optional(),
  discord: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues = {
  name: "",
  preferred_name: "",
  pronouns: "he/him",
  isUWA: true,
  student_number: "",
  uni: "",
  github: "",
  discord: "",
}

export default function CreateAccount() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get("email")

  const { isLoaded } = useSignUp()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      email: email ?? "",
    },
  })

  const { getValues } = form

  const user_github = getValues().github

  if (!isLoaded) {
    return null
  }

  const onSubmit = async (values: FormSchema) => {
    console.log(values)
  }

  return (
    <main className="main">
      <div className="container flex gap-x-8 py-8 lg:gap-x-16">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:max-w-md"
          >
            {/* <Alert>
              <span className="material-symbols-sharp size-4 text-xl leading-4">
                mail
              </span>
              <AlertTitle>Verification email sent!</AlertTitle>
              <AlertDescription>
                It can take upto 10 minutes. Make sure to check your spam folder
                if you can't find it.
              </AlertDescription>
            </Alert> */}
            <div className="space-y-2">
              <h2 className="font-semibold leading-none tracking-tight">
                Personal details
              </h2>
              <p className="text-sm text-muted-foreground">
                All fields here are required.
              </p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@codersforcauses.org"
                      {...field}
                    />
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
                    <Input
                      autoComplete="name"
                      placeholder="John Doe"
                      {...field}
                    />
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
                    <Input
                      autoComplete="given-name"
                      placeholder="John"
                      {...field}
                    />
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
                        <FormItem
                          key={value}
                          className="flex h-6 items-center space-x-3 space-y-0"
                        >
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
                        <FormControl>
                          <Input
                            placeholder="Other pronouns"
                            {...field}
                            disabled
                            className="h-8"
                          />
                        </FormControl>
                        <FormLabel className="sr-only">Neo-pronouns</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-y-4">
              {/* <div className="space-y-2">
                  <h2 className="font-semibold leading-none tracking-tight">
                    Where do you study?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    If you're a UWA student, please enter your student number.
                    If not, please select your university.
                  </p>
                </div> */}
              <FormField
                control={form.control}
                name="isUWA"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-mono">
                      I'm a UWA student
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {getValues().isUWA ? (
                <FormField
                  control={form.control}
                  name="student_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono">
                        UWA student number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="21012345"
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="uni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono">University</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid sm:grid-cols-2"
                        >
                          {uni.map(({ label, value }) => (
                            <FormItem
                              key={value}
                              className="flex h-6 items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {label}
                              </FormLabel>
                            </FormItem>
                          ))}
                          <FormItem className="flex h-6 items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormControl>
                              <Input
                                placeholder="Other university"
                                {...field}
                                disabled
                                className="h-8"
                              />
                            </FormControl>
                            <FormLabel className="sr-only">
                              Unlisted university
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="grid gap-y-4 sm:grid-cols-2 md:gap-x-3">
              <div className="space-y-2 sm:col-span-2">
                <h2 className="font-semibold leading-none tracking-tight">
                  Socials
                </h2>
                <p className="text-sm text-muted-foreground">
                  These fields are optional but are required if you plan on
                  applying for projects during the winter and summer breaks.
                </p>
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
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-current"
                        asChild
                      >
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
                    <FormLabel className="font-mono">
                      Discord username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="john_doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Sign up at{" "}
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-current"
                        asChild
                      >
                        <Link
                          href="https://discord.com/register"
                          target="_blank"
                        >
                          discord.com/register
                        </Link>
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row-reverse">
              <Button type="submit" size="lg">
                Finish
              </Button>
            </div>
          </form>
        </Form>
        <div className="hidden w-full border border-border md:block">
          <div className="relative h-40 border-b border-muted bg-black">
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
        </div>
      </div>
    </main>
  )
}
