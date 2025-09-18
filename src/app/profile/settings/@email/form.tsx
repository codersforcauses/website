"use client"

import { useReverification, useUser } from "@clerk/nextjs"
import { EmailAddressResource } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { se } from "date-fns/locale"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"

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
  new_email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(2, {
      message: "New email is required",
    }),
})

type FormSchema = z.infer<typeof formSchema>

const defaultValues: FormSchema = {
  email: "",
  new_email: "",
}

const EmailForm = (props: { user_id: string; email?: Partial<FormSchema> }) => {
  const utils = api.useUtils()
  const { isLoaded, isSignedIn, user } = useUser()
  const [step, setStep] = useState<"submitForm" | "enterCode" | "verifying" | "updated">("submitForm")
  const [countdown, setCountdown] = useState(0)
  const [send, setSend] = useState(false)
  const [code, setCode] = useState("")
  const [emailObj, setEmailObj] = useState<EmailAddressResource | undefined>()
  const createEmailAddress = useReverification((email: string) => user?.createEmailAddress({ email }))
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [countdown])

  useEffect(() => {
    const run = async () => {
      if (step === "enterCode" && emailObj && send) {
        await emailObj.prepareVerification({ strategy: "email_code" }).catch((e) => {
          console.error(e)
          toast({
            variant: "destructive",
            title: "Error sending OTP",
            description: `${(e as { message?: string })?.message ?? ""}`,
          })
          setSend(false)
          return
        })
        setSend(false)
        setCountdown(60)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }

    run()
  }, [emailObj, step, send])

  const updateEmail = api.users.updateEmail.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to update email",
        description: error.message,
      })
    },
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: props.email ? { ...props.email } : defaultValues,
  })
  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <p>You must be logged in to access this page</p>
  }

  const sendOtp = async (values: FormSchema) => {
    setSend(true)
    try {
      if (values.new_email.trim() === user?.primaryEmailAddress?.emailAddress) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "New email must be different from current email",
        })
        return
      }

      if (!user.emailAddresses.some((e) => e.emailAddress === values.new_email.trim())) {
        const res = await createEmailAddress(values.new_email.trim())
        await user.reload()
        const emailAddress = user.emailAddresses.find((a) => a.id === res?.id)
        setEmailObj(emailAddress)
      }

      setStep("enterCode")
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: `Error sending OTP. ${(error as { message?: string })?.message ?? ""} `,
      })
    }
  }
  const onSubmit = async (data: FormSchema) => {
    setStep("verifying")
    try {
      const emailVerifyAttempt = await emailObj?.attemptVerification({ code })

      if (emailVerifyAttempt?.verification.status === "verified") {
        await updateEmail.mutateAsync({
          userId: props.user_id,
          oldEmail: (data.email ?? "").trim(),
          newEmail: (data.new_email ?? "").trim(),
        })
        setStep("updated")
        toast({
          title: "Email updated",
          description: "Your email has been updated successfully.",
        })
        window.location.reload()
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "The code you entered is incorrect. Please try again.",
        })
        setStep("enterCode")
      }
    } catch (error) {
      console.log("Update error", error)
      toast({
        variant: "destructive",
        title: "Failed to update email",
        description: `An error occurred while trying to update email. ${(error as { message?: string })?.message ?? ""}`,
      })
      setStep("enterCode")
    }
  }

  return (
    <FormProvider {...form}>
      {step === "submitForm" ? (
        <form onSubmit={form.handleSubmit(sendOtp)} className="grid max-w-xl gap-y-4">
          <div className="grid gap-y-4">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-1 font-mono">
                    <p>New email address</p>
                    <p className="font-sans">*</p>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@codersforcauses.org" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting} className="relative w-full">
            Next
          </Button>
        </form>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormLabel className="font-mono">Enter one-time code from your new email</FormLabel>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            placeholder="xxxxxx"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button type="submit" disabled={step === "verifying" || step === "updated"} className="relative w-full">
            {step === "verifying" ? "Waiting for code verification" : step === "updated" ? "Email updated" : "Submit"}
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
    </FormProvider>
  )
}

export default EmailForm
