"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import CircleProgress from "~/components/ui/circle-progress"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

interface EditProfileProps {
  setIsEditing: (value: boolean) => void
  refetch: ReturnType<typeof api.users.get.useQuery>["refetch"]
  id: string
}

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
  .refine(({ isUWA, student_number = "" }) => !Boolean(isUWA) || /^\d{8}$/.test(student_number), {
    message: "Student number must be 8 digits",
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

const EditProfile = ({ setIsEditing, id, refetch }: EditProfileProps) => {
  const [showCircleProgress, setShowCircleProgress] = useState(false)
  const { data: user } = api.users.get.useQuery(id)
  const { mutateAsync: updateUser } = api.users.update.useMutation()

  const userDefaultValues = user && {
    name: user.name,
    preferred_name: user.preferred_name,
    email: user.email,
    pronouns: user.pronouns,
    isUWA: !!user.student_number,
    student_number: user.student_number ?? undefined,
    uni: user.university ?? undefined,
    github: user.github ?? undefined,
    discord: user.discord ?? undefined,
    subscribe: user.subscribe,
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: userDefaultValues ?? defaultValues,
  })
  const { getValues } = form

  const onSubmit = async (data: FormSchema) => {
    setShowCircleProgress(true)
    try {
      await Promise.all([
        updateUser({
          ...data,
          student_number: data.isUWA ? data.student_number : null,
          uni: data.isUWA ? "UWA" : data.uni,
        }),
      ])

      await refetch()
    } catch (e) {
      console.error(e, "Error updating user")
    }

    setIsEditing(false)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <section>
          <FormField
            control={form.control}
            name="preferred_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Preferred Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Full Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        <section>
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
                        <RadioGroupItem value="" />
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
        </section>

        <div className=" grid gap-y-4">
          <section className="space-y-2">
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
          </section>
          <section className="space-y-4">
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
          </section>
        </div>
        <section className="flex flex-row items-center space-x-2">
          {showCircleProgress ? (
            <Button variant="outline" disabled>
              <div className="flex items-center justify-center space-x-1">
                <CircleProgress />
                <p>Saving...</p>
              </div>
            </Button>
          ) : (
            <Button type="submit" variant={"outline"}>
              Save
            </Button>
          )}
          <Button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </section>
      </form>
    </FormProvider>
  )
}

export default EditProfile
