"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSignIn } from "@clerk/nextjs"
import * as z from "zod"

import { SITE_URL } from "~/lib/constants"
import { type ClerkError } from "~/lib/types"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"
import { setUserCookie } from "../actions"

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

  const userData = api.user.login.useMutation()

  const onSubmit = async ({ email }: FormSchema) => {
    if (!isLoaded) return null

    const { startEmailLinkFlow } = signIn.createEmailLinkFlow()
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
          description: "The email verification link has expired. Please try again.",
        })
      }
      if (res.status === "complete") {
        // needs to be in this order or fails
        await setActive({ session: res.createdSessionId }) // sets token from clerk
        const user = await userData.mutateAsync() // get user details and sets cookie on success
        await setUserCookie(user!)

        router.push("/dashboard")
      }
    } catch (error) {
      const { errors = [] } = error as ClerkError
      if (errors?.[0]?.code === "form_identifier_not_found") {
        router.replace(`/create-account?email=${email}`)
      }
      console.error(error)
    }
  }

  return (
    <div className="container grid gap-y-8 py-8 md:grid-cols-2 md:gap-x-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {showAlert ? (
            <Alert>
              <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
              <AlertTitle>Verification email sent!</AlertTitle>
              <AlertDescription>
                It can take up to 10 minutes. Make sure to check your spam folder if you can&apos;t find it.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <span className="material-symbols-sharp size-4 text-xl leading-4">help</span>
              <AlertTitle>Welcome!</AlertTitle>
              <AlertDescription>
                No passwords here! Enter your email, and we&apos;ll email you a link to sign in or bring you to the sign
                up page.
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
                  <Input type="email" placeholder="hello@codersforcauses.org" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={showAlert} className="w-full">
            {showAlert ? "Waiting for email verification" : "Continue"}
          </Button>
        </form>
      </Form>
      <div aria-hidden className="hidden place-items-center font-mono leading-none md:grid">
        <span className="text-8xl">:)</span>
      </div>
    </div>
  )
}
