"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@vercel/analytics/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { siDiscord } from "simple-icons"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
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
  email: "",
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

const AddUserForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const { isLoading, mutate: createUserManual } = api.user.createManual.useMutation({
    onSuccess: () => {
      form.reset()
      toast({
        title: "User created",
        description: "User has been created",
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to create user",
        description: error.message,
      })
    },
  })
  const { getValues, setError } = form

  const onSubmit = async (values: FormSchema) => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("created-account")

    // move to react hook form?
    if (values.github !== "") {
      const { status: githubStatus } = await fetch(`https://api.github.com/users/${values.github}`)

      if (githubStatus !== 200) {
        setError("github", {
          type: "custom",
          message: "Github username not found",
        })
        return
      }
    }

    createUserManual(values)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col flex-wrap gap-4 text-left" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="John Doe" {...field} />
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
                <Input placeholder="John" {...field} />
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
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid sm:grid-cols-2">
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
            <Alert className="text-left">
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Please wait" : "Submit"}
          {isLoading && <span className="material-symbols-sharp ml-2 animate-spin">progress_activity</span>}
        </Button>
      </form>
    </Form>
  )
}

export default AddUserForm
