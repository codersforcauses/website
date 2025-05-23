"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { siDiscord } from "simple-icons"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"

import { api } from "~/trpc/react"

const formSchema = z.object({
  github: z.string().optional(),
  discord: z.string().optional(),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues: FormSchema = {
  github: "",
  discord: "",
}

const SocialsForm = (props: { defaultValues?: Partial<FormSchema> }) => {
  const [loading, setLoading] = React.useState(false)
  const utils = api.useUtils()
  const updateSocials = api.users.updateSocials.useMutation({
    onSuccess: async () => {
      await utils.users.getCurrent.refetch()
    },
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues ?? defaultValues,
  })

  const onSubmit = async (data: FormSchema) => {
    setLoading(true)
    try {
      if (data.github !== "") {
        const { status: githubStatus } = await fetch(`https://api.github.com/users/${data.github}`)

        if (githubStatus !== 200) {
          form.setError("github", {
            type: "custom",
            message: "Github username not found",
          })
          return
        }
      }

      updateSocials.mutate({
        github: (data.github ?? "").trim() || null,
        discord: (data.discord ?? "").trim() || null,
      })
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Failed to update user socials",
        description: "An error occurred while trying to update your socials. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...form}>
      <form className="grid max-w-xl gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
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
        </div>
        <Button type="submit" disabled={loading || !form.formState.isDirty} className="w-full">
          {loading ? "Updating your info" : "Update"}
          {loading && <span className="material-symbols-sharp absolute right-4 animate-spin">progress_activity</span>}
        </Button>
      </form>
    </FormProvider>
  )
}

export default SocialsForm
