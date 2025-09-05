"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form"
import { siDiscord } from "simple-icons"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Separator } from "~/components/ui/separator"
import { toast } from "~/components/ui/use-toast"

import { PRONOUNS, UNIVERSITIES } from "~/lib/constants"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

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

const PersonalForm = (props: { defaultValues?: Partial<FormSchema> }) => {
  const utils = api.useUtils()
  const updateUser = api.users.update.useMutation({
    onSuccess: async () => {
      await utils.users.getCurrent.refetch()
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to update user details",
        description: "An error occurred while trying to update your personal details. Please try again later.",
      })
    },
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...props.defaultValues },
  })
  const { getValues, setError } = form

  const onSubmit = async (data: FormSchema) => {
    if (data.github !== "") {
      const { status: githubStatus } = await fetch(`https://api.github.com/users/${data.github}`)

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
    try {
      updateUser.mutate({
        ...data,
        student_number: !data.isUWA ? null : data.student_number,
        uni: data.isUWA ? "UWA" : data.uni,
      })
      toast({
        title: "Update successful",
        description: "Your personal details have been updated successfully.",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to update user details",
        description: "An error occurred while trying to update your personal details. Please try again later.",
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form className="grid max-w-xl gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input disabled type="email" placeholder="john.doe@codersforcauses.org" {...field} />
              </FormControl>
              <FormDescription>Email address can be updated in the `Email` tab.</FormDescription>
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
                <p>Full name</p>
                <p className="font-sans">*</p>
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
                  {/* TODO: fix other case */}
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
                <FormLabel className="flex space-x-1 font-mono">
                  <p>University</p>
                  <p className="font-sans">*</p>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
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
          <div className="mt-4">
            <h2 className="font-medium font-mono">Socials</h2>
            <p className="text-sm text-muted-foreground">
              These fields are optional but are required if you plan on applying for projects during the winter and
              summer breaks.
            </p>
          </div>
          <Separator className="md:max-w-2xl" />
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
        </div>
        <Button type="submit" disabled={updateUser.isLoading || !form.formState.isDirty} className="w-full">
          {updateUser.isLoading ? "Updating your info" : "Update"}
          {updateUser.isLoading && (
            <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>
          )}
        </Button>
      </form>
    </FormProvider>
  )
}

export default PersonalForm
