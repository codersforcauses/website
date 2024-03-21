"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
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
  })
  .refine(({ isUWA, student_number }) => !Boolean(isUWA) || student_number, {
    message: "Student number is required",
    path: ["student_number"],
  })
  .refine(({ isUWA, student_number = "" }) => !Boolean(isUWA) || student_number?.length === 8, {
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
  pronouns: PRONOUNS[0].value,
  isUWA: true,
  student_number: "",
  uni: UNIVERSITIES[0].value,
}

const PersonalForm = (props: { defaultValues?: Partial<FormSchema> }) => {
  const utils = api.useUtils()
  const updateUser = api.user.update.useMutation({
    onSuccess: async () => {
      await utils.user.getCurrent.refetch()
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
    defaultValues: props.defaultValues
      ? { ...props.defaultValues, uni: props.defaultValues?.uni ?? UNIVERSITIES[0].value }
      : defaultValues,
  })
  const { getValues } = form

  const onSubmit = (data: FormSchema) => {
    updateUser.mutate({
      ...data,
      student_number: !data.isUWA ? null : data.student_number,
      uni: data.isUWA ? null : data.uni,
    })
  }

  return (
    <FormProvider {...form}>
      <form className="grid max-w-xl gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono">Email address</FormLabel>
              <FormControl>
                <Input disabled type="email" placeholder="john.doe@codersforcauses.org" {...field} />
              </FormControl>
              <FormDescription>
                Email address cannot be updated right now. Please contact us if it needs to be changed.
              </FormDescription>
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
              <FormLabel className="font-mono">Preferred name</FormLabel>
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
              <FormLabel className="font-mono">Pronouns</FormLabel>
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
