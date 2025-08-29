"use client"

import { useClerk, useUser } from "@clerk/nextjs"
import { EmailLinkErrorCode, isEmailLinkError } from "@clerk/nextjs/errors"
import { useRouter } from "next/navigation"
import * as React from "react"

import { api } from "~/trpc/react"

export default function Verification() {
  const [verificationStatus, setVerificationStatus] = React.useState("loading")
  const { handleEmailLinkVerification } = useClerk()
  const { user } = useUser()
  const rollbackMutation = api.users.rollbackClerk.useMutation()
  const { data: dbUser, isLoading: isDbUserLoading } = api.users.getCurrent.useQuery()
  const router = useRouter()
  React.useEffect(() => {
    const verify = async () => {
      try {
        // TODO: redirect to dashboard if signing in, or to the create account page if signing up
        await handleEmailLinkVerification({})
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.

        if (isDbUserLoading) {
          // still loading → do nothing yet
          return
        }
        if (!dbUser) {
          if (user?.id) {
            await rollbackMutation.mutateAsync({ clerk_id: user.id })
          }
          setVerificationStatus("dbFailed")
          return
        } else setVerificationStatus("verified")
      } catch (err) {
        // Verification has failed.

        let status = "failed"
        // @ts-expect-error - Yes it does
        if (isEmailLinkError(err as Error) && err?.code === EmailLinkErrorCode.Expired) {
          status = "expired"
        }
        setVerificationStatus(status)
      }
    }
    verify().catch((e) => {
      console.error(e)
    })
  }, [handleEmailLinkVerification, router, user, dbUser, rollbackMutation])

  switch (verificationStatus) {
    case "loading":
      return <main className="main container grid place-items-center text-xl">Loading...</main>
    case "expired":
      return <main className="main container grid place-items-center text-xl">Verification link has expired!</main>
    case "failed":
      return <main className="main container grid place-items-center text-xl">Verification failed!</main>
    case "dbFailed":
      return (
        <main className="main container grid place-items-center text-xl">
          Verification failed because the registration page was closed! Please DO NOT close the registration page while
          verifying your email address! Please try again!
        </main>
      )
    default:
      return (
        <main className="main container grid place-items-center text-xl">
          Verification successful. Return to the original tab to continue. You may close this tab.
        </main>
      )
  }
}
