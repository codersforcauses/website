"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSignIn } from "@clerk/nextjs"
import * as z from "zod"

import { SITE_URL } from "~/lib/constants"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { toast } from "~/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(2, {
      message: "Email is required",
    }),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues = {
  email: "",
}

export default function Join() {
  const [showAlert, setShowAlert] = React.useState(false)
  const router = useRouter()
  const { signIn, isLoaded, setActive } = useSignIn()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  if (!isLoaded) {
    return null
  }

  const { startEmailLinkFlow } = signIn.createEmailLinkFlow()

  const onSubmit = async ({ email }: FormSchema) => {
    try {
      const si = await signIn.create({ identifier: email })

      const { emailAddressId } = si.supportedFirstFactors.find(
        (ff) => ff.strategy === "email_link" && ff.safeIdentifier === email,
      )!

      if (!emailAddressId) return

      setShowAlert(true)
      // Start the magic link flow.
      const res = await startEmailLinkFlow({
        emailAddressId: emailAddressId as string,
        redirectUrl: `${SITE_URL}/verification`,
      })
      const verification = res.firstFactorVerification
      // Check the verification result.
      if (verification.status === "expired") {
        toast({
          title: "Link expired",
          description:
            "The email verification link has expired. Please try again.",
        })
      }
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId })
        router.push("/dashboard")
      }
    } catch (error) {
      console.error(error)
      if (error?.errors?.[0].code === "form_identifier_not_found") {
        router.push(`/create-account?email=${email}`)
      }
    }
  }

  return (
    <main className="main">
      <div className="container grid gap-y-8 py-8 md:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {showAlert && (
              <Alert>
                <span className="material-symbols-sharp size-4 text-xl leading-4">
                  mail
                </span>
                <AlertTitle>Verification email sent!</AlertTitle>
                <AlertDescription>
                  It can take upto 10 minutes. Make sure to check your spam
                  folder if you can't find it.
                </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="hello@codersforcauses.org"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row-reverse">
              <Button type="submit" size="lg" disabled={showAlert}>
                {showAlert ? "Waiting for email" : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
