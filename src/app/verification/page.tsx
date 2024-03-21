"use client"

import * as React from "react"
import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

type VerificationStatus = "loading" | "verified" | "expired" | "failed"

export default function Verification() {
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = React.useState<VerificationStatus>("loading")
  const { handleEmailLinkVerification } = useClerk()

  React.useEffect(() => {
    const verify = async () => {
      try {
        await handleEmailLinkVerification({})
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified")
      } catch (err) {
        // Verification has failed.
        let status: VerificationStatus = "failed"
        if (isEmailLinkError(err as Error) && err?.code === EmailLinkErrorCode.Expired) {
          status = "expired"
        }
        setVerificationStatus(status)
      }
    }
    verify().catch((e) => {
      console.error(e)
    })
  }, [handleEmailLinkVerification])

  React.useEffect(() => {
    // If the user closes the tab, we should still mark the verification as failed.
    let timeout: NodeJS.Timeout
    if (verificationStatus === "verified") {
      timeout = setTimeout(() => {
        router.push("/dashboard")
      }, 5000)
    }
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [router, verificationStatus])

  switch (verificationStatus) {
    case "loading":
      return <main className="main container grid place-items-center text-xl">Loading...</main>
    case "expired":
      return <main className="main container grid place-items-center text-xl">Verification link has expired!</main>
    case "failed":
      return <main className="main container grid place-items-center text-xl">Verification failed!</main>
    default:
      return (
        <main className="main container grid place-items-center text-xl">
          Verification successful. Return to the original tab to continue. You may close this tab. You will be
          redirected in 5 seconds.
        </main>
      )
  }
}
