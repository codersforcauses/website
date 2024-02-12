"use client"

import * as React from "react"
import { type TokenResult, type Payments, type PaymentRequestOptions, type ApplePay } from "@square/web-sdk"

import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"

interface ApplePayProps {
  theme: string
  paymentInstance: Payments
  payRequest: PaymentRequestOptions
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  cardTokenizeResponseReceived: (token: TokenResult) => Promise<void>
}

const applePayID = "apple-pay-container"

const ApplePay = ({ paymentInstance, payRequest, theme, ...props }: ApplePayProps) => {
  const [applePay, setApplePay] = React.useState<ApplePay | undefined>(() => undefined)

  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!paymentInstance) return

    const paymentRequest = paymentInstance.paymentRequest(payRequest)
    paymentInstance
      .applePay(paymentRequest)
      .then((apay) => {
        if (signal?.aborted) {
          return
        }
        setApplePay(apay)

        if (signal.aborted) {
          apay?.destroy().catch((error) => {
            console.log(error)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {
      abortController.abort()
    }
  }, [payRequest, paymentInstance])

  const handlePayment = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!applePay) {
      console.warn("Apple Pay button was clicked, but no Apple Pay instance was found.")
      return
    }

    try {
      props.loadingState[1](true)
      const result = await applePay.tokenize()
      console.log(result, result.status)

      if ((result.status as string) === "OK") {
        const tokenizedResult = await props.cardTokenizeResponseReceived(result)

        return tokenizedResult
      }

      let message = `Tokenization failed with status: ${result.status}`
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`

        throw new Error(message)
      }

      console.warn(message)
    } catch (error) {
      console.log(error)
    } finally {
      props.loadingState[1](false)
    }
  }

  return (
    <div
      id={applePayID}
      className={cn(
        "overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        applePay && "bg-primary ring-offset-background",
      )}
      style={{ WebkitAppearance: "-apple-pay-button" }}
      onClick={handlePayment}
    >
      {!applePay && <Skeleton className="h-10 w-full" />}
    </div>
  )
}

export default ApplePay
