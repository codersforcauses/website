"use client"

import * as React from "react"
import { type TokenResult, type Payments, type PaymentRequestOptions, type GooglePay } from "@square/web-sdk"

import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"

interface GooglePayProps {
  theme: string
  paymentInstance: Payments
  payRequest: PaymentRequestOptions
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  cardTokenizeResponseReceived: (token: TokenResult) => Promise<void>
}

const googlePayID = "google-pay-container"

const GooglePay = ({ paymentInstance, payRequest, theme, ...props }: GooglePayProps) => {
  const [googlePay, setGooglePay] = React.useState<GooglePay | undefined>(() => undefined)

  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!paymentInstance) return

    const paymentRequest = paymentInstance.paymentRequest(payRequest)
    paymentInstance
      .googlePay(paymentRequest)
      .then((gpay) => {
        if (signal?.aborted) {
          return
        }
        gpay
          .attach(`#${googlePayID}`, {
            buttonColor: "white",
            buttonType: "short",
            buttonSizeMode: "fill",
          })
          .catch((error) => {
            console.log(error)
          })
        setGooglePay(gpay)

        if (signal.aborted) {
          gpay?.destroy().catch((error) => {
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
  // Style card payment and google pay button according to theme
  React.useEffect(() => {
    if (!googlePay) return
    googlePay
      .detach()
      .then(async () => {
        await googlePay.attach(`#${googlePayID}`, {
          buttonColor: theme === "dark" ? "white" : "black",
          buttonSizeMode: "fill",
          buttonType: "short",
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [googlePay, theme])

  const handlePayment = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!googlePay) {
      console.warn("Google Pay button was clicked, but no Google Pay instance was found.")
      return
    }

    try {
      props.loadingState[1](true)
      const result = await googlePay.tokenize()
      // console.log(result, result.status)
      // console.log(TokenStatus)

      if ((result.status as string) === "OK") {
        // console.log("test")
        return props.cardTokenizeResponseReceived(result)
      }

      let message = `Tokenization failed with status: ${result.status}`
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors, null, 2)}`

        throw new Error(message)
      }

      console.warn(message)
    } catch (error) {
      console.error(error)
    } finally {
      props.loadingState[1](false)
    }
  }

  return (
    <div
      id={googlePayID}
      className={cn(
        "overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        googlePay && "bg-primary ring-offset-background",
      )}
      onClick={handlePayment}
    >
      {!googlePay && <Skeleton className="h-10 w-full" />}
    </div>
  )
}

export default GooglePay
