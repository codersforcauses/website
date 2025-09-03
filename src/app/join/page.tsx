"use client"

import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@vercel/analytics/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"

import type { ClerkError } from "~/lib/types"
import { api } from "~/trpc/react"

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
  const router = useRouter()
  const [step, setStep] = useState<"initial" | "email" | "verification">("initial")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const utils = api.useUtils()
  const { signIn, isLoaded, setActive } = useSignIn()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [countdown])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const sendOtp = async ({ email }: FormSchema) => {
    if (!isLoaded) return null

    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("click-join")

    try {
      const attempt = await signIn.create({ identifier: email })
      const emailFactor = attempt.supportedFirstFactors.find((factor) => factor.strategy === "email_code")

      if (!emailFactor || emailFactor.strategy !== "email_code") {
        throw new Error("Email code factor not supported")
      }

      const si = await attempt.prepareFirstFactor({
        emailAddressId: emailFactor.emailAddressId,
        strategy: "email_code",
      })
      setCountdown(60)
      setStep("email")
      window.scrollTo({
        top: 0,
        behavior: "smooth", // smooth scrolling
      })
    } catch (error) {
      const { errors = [] } = error as ClerkError
      if (errors?.[0]?.code === "form_identifier_not_found") {
        router.replace(`/create-account?email=${email}`)
      }
      console.error(error)
    }
  }

  const onSubmit = async ({ email }: FormSchema) => {
    try {
      if (!isLoaded) return
      setStep("verification")
      setLoading(true)
      const attempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      })

      if (attempt.firstFactorVerification?.status === "expired") {
        toast({
          variant: "destructive",
          title: "Link expired",
          description: "The verification code has expired. Please try again.",
        })
      }

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId }) // sets token from clerk
        await utils.users.getCurrent.refetch()
        toast({
          title: "Logged in",
          description: "You have successfully logged in.",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: `${(error as { message?: string })?.message ?? "Unknown error"}.`,
      })
      setLoading(false)
      setStep("email")
    }
  }

  return (
    <div>
      <Form {...form}>
        {step === "initial" ? (
          <Alert>
            <span className="material-symbols-sharp size-4 text-xl leading-4">help</span>
            <AlertTitle>Welcome!</AlertTitle>
            <AlertDescription>
              No passwords here! Enter your email, and we&apos;ll email you a link that contains a verification code to
              sign in or bring you to the sign up page.
            </AlertDescription>
          </Alert>
        ) : step === "email" ? (
          <Alert>
            <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
            <AlertTitle>Email verification code sent!</AlertTitle>
            <AlertDescription>
              It can take up to 10 minutes. Make sure to check your spam folder if you can&apos;t find it.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
            <AlertTitle>Verifying your account</AlertTitle>
            <AlertDescription>Thanks for your patience! We are verifying your account.</AlertDescription>
          </Alert>
        )}
        {step === "initial" ? (
          <form onSubmit={form.handleSubmit(sendOtp)} className="space-y-4 mt-4">
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
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormLabel className="font-mono">Enter one-time code from your email</FormLabel>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              placeholder="xxxxxx"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading} className="relative w-full">
              {loading ? "Waiting for code verification" : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="relative w-full"
              onClick={() => sendOtp(form.getValues())}
              disabled={countdown > 0}
            >
              Resend code {countdown > 0 ? `(${countdown}s)` : ""}
            </Button>
          </form>
        )}
      </Form>
    </div>
  )
}
