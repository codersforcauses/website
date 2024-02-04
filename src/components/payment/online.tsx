"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  payments,
  type TokenResult,
  type Payments,
  type VerifyBuyerResponseDetails,
  type StoreVerifyBuyerDetails,
  type Card,
  type PaymentRequestOptions,
  type GooglePay,
  type ApplePay,
  TokenStatus,
} from "@square/web-sdk"

import { env } from "~/env"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"
import { style } from "./styles"
import { initialize } from "next/dist/server/lib/render-server"
import { create } from "domain"
import { error } from "console"

interface OnlinePaymentFormProps {
  amount?: string
  label?: string
  cardTokenizeResponseReceived: (
    token: TokenResult,
    verifiedBuyer?: VerifyBuyerResponseDetails | null,
  ) => void | Promise<void>
}

const APP_ID = env.NEXT_PUBLIC_SQUARE_APP_ID
console.log("app_id 2", APP_ID)
const LOCATION_ID = env.NEXT_PUBLIC_SQUARE_LOCATION_ID
const containerID = "card-container"
const googlePayID = "google-pay-container"
const applePayID = "apple-pay-button"
const buttonID = "card-button"

const storeVerificationDetails = () => {
  const details: StoreVerifyBuyerDetails = {
    intent: "STORE",
    billingContact: {
      familyName: "Doe",
      givenName: "John",
      email: "jondoe@gmail.com",
      city: "London",
    },
  }
  return details
}

const createPaymentRequest = ({
  amount,
  label,
}: Omit<Required<OnlinePaymentFormProps>, "cardTokenizeResponseReceived">) => {
  const request: PaymentRequestOptions = {
    countryCode: "AU",
    currencyCode: "AUD",
    total: {
      amount,
      label,
    },
  }
  return request
}

const OnlinePaymentForm = ({
  amount = "5.00",
  label = `CFC Membership ${new Date().getFullYear()}}`,
  ...props
}: OnlinePaymentFormProps) => {
  const { resolvedTheme: theme } = useTheme()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [paymentInstance, setPaymentInstance] = React.useState<Payments>()
  const [card, setCard] = React.useState<Card | undefined>(() => undefined)
  const [googlePay, setGooglePay] = React.useState<GooglePay | undefined>(() => undefined)
  const [applePay, setApplePay] = React.useState<ApplePay | undefined>(() => undefined)

  // initialize payment instance
  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!APP_ID || !LOCATION_ID) return

    payments(APP_ID, LOCATION_ID)
      .then((res) => {
        if (!res) throw new Error("Square Web Payments SDK failed to load")
        if (signal?.aborted) return
        setPaymentInstance(res)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {
      abortController.abort()
    }
  }, [])

  // Apple Pay
  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!paymentInstance) return

    const paymentRequest = paymentInstance.paymentRequest(
      createPaymentRequest({
        amount,
        label,
      }),
    )
    paymentInstance
      .applePay(paymentRequest)
      .then((apay) => {
        if (signal?.aborted) {
          return
        }

        console.log(apay)
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
  }, [paymentInstance, amount, label])

  // Google Pay
  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!paymentInstance) return

    const paymentRequest = paymentInstance.paymentRequest(
      createPaymentRequest({
        amount,
        label,
      }),
    )
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
        console.log(gpay)
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
  }, [paymentInstance, amount, label])

  // Credit/Debit card
  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!paymentInstance) return

    paymentInstance
      .card()
      .then(async (card) => {
        if (signal.aborted) {
          return
        }
        await card.attach(`#${containerID}`)
        setCard(card)

        if (signal.aborted) {
          card?.destroy().catch((error) => {
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
  }, [paymentInstance])

  // Style card payment and google pay button according to theme
  React.useEffect(() => {
    if (!card) return
    card
      .configure({
        style: style(theme ?? "light"),
      })
      .catch((error) => {
        console.log(error)
      })
  }, [card, theme])
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

  const cardTokenizeResponseReceived = async (result: TokenResult): Promise<void> => {
    if (result.errors) {
      await props.cardTokenizeResponseReceived(result)
      return
    }

    const verifyBuyerResults = await paymentInstance?.verifyBuyer(String(result.token), storeVerificationDetails())
    await props.cardTokenizeResponseReceived(result, verifyBuyerResults)

    const response = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        sourceId: result.token,
        amount: amount,
        currency: "AUD",
      }),
    })
    console.log(await response.json())

    // TODO: Decide how you want to use this information Jezz
  }

  const handleApplePayment = async (e: React.MouseEvent) => {
    e.stopPropagation()

    // TODO: set loading state

    if (!applePay) {
      console.error("Apple Pay button was clicked. but no Apple Pay instance was found.")

      return
    }

    try {
      const result = await applePay.tokenize()
      console.log(result, result.status)

      if ((result.status as string) === "OK") {
        const tokenizedResult = await cardTokenizeResponseReceived(result)

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
      // TODO: unset loading stage (thx jerry)
    }
  }

  const handleCardPayment = async (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: set loading state
    if (!card) {
      console.error("Card is not initialized")
      return
    }
    try {
      const result = await card.tokenize()

      if ((result.status as string) === "OK") {
        const tokenizedResult = await cardTokenizeResponseReceived(result)
        return tokenizedResult
      }

      let message = `Tokenization failed with status: ${result.status}`
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`

        throw new Error(message)
      }

      console.warn(message)
    } catch (error) {
      console.error(error)
    } finally {
      // TODO: unset loading state
    }
  }

  const handleGPayPayment = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!googlePay) {
      console.warn("Google Pay button was clicked, but no Google Pay instance was found.")

      return
    }

    try {
      const result = await googlePay.tokenize()
      // console.log(result, result.status)
      // console.log(TokenStatus)

      if ((result.status as string) === "OK") {
        // console.log("test")
        return cardTokenizeResponseReceived(result)
      }

      let message = `Tokenization failed with status: ${result.status}`
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors, null, 2)}`

        throw new Error(message)
      }

      console.warn(message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="grid gap-y-4 @container">
      <div>
        {!card && <Skeleton className="mb-4 h-[97px] w-full @[485px]:h-[48px]" />}
        <div
          id={containerID}
          className="min-h-10"
          style={{
            // needed to force colours to work on both themes
            // since for some reason background colour works in light theme but is white on dark theme
            colorScheme: "light",
          }}
        />
        <Button
          type="button"
          id={buttonID}
          ref={btnRef}
          disabled={!card}
          className="w-full"
          onClick={handleCardPayment}
        >
          Pay ${Number(amount)}
        </Button>
      </div>
      <div
        id={googlePayID}
        className={cn(
          "overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          googlePay && "bg-primary ring-offset-background",
        )}
        onClick={handleGPayPayment}
      >
        {!googlePay && <Skeleton className="h-10 w-full" />}
      </div>
      <div
        id="apple-pay-button"
        className={cn(
          "overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          applePay && "bg-primary ring-offset-background",
        )}
        style={{ WebkitAppearance: "-apple-pay-button" }}
        onClick={handleApplePayment}
      >
        {!applePay && <Skeleton className="h-10 w-full" />}
      </div>
    </form>
  )
}

export default OnlinePaymentForm
