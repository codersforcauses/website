"use client"

import * as React from "react"
import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs"

export default function Verification() {
  const [verificationStatus, setVerificationStatus] = React.useState("loading")
  const { handleEmailLinkVerification } = useClerk()

  React.useEffect(() => {
    const verify = async () => {
      try {
        await handleEmailLinkVerification({
          redirectUrl: "https://redirect-to-pending-sign-up",
          redirectUrlComplete: "https://redirect-when-sign-up-complete",
        })
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified")
      } catch (err) {
        // Verification has failed.
        let status = "failed"
        if (isEmailLinkError(err as Error) && err.code === EmailLinkErrorCode.Expired) {
          status = "expired"
        }
        setVerificationStatus(status)
      }
    }
    verify().catch((e) => {
      console.error(e)
    })
  }, [handleEmailLinkVerification])

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
          Verification successful. Return to the original tab to continue.
        </main>
      )
  }
}
