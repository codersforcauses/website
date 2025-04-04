"use client"

import { type ApplePay, type PaymentRequestOptions, type Payments, type TokenResult } from "@square/web-sdk"
import * as React from "react"

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

const ApplePay = ({ paymentInstance, payRequest, ...props }: ApplePayProps) => {
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
        "h-10 overflow-hidden rounded-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:cursor-pointer",
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
