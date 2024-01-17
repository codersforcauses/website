"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  payments,
  type TokenResult,
  type Payments,
  type VerifyBuyerResponseDetails,
  type StoreVerifyBuyerDetails,
  type Card,
  type PaymentRequestOptions,
  type GooglePay,
} from "@square/web-sdk"

import { env } from "~/env"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"

import { style } from "./styles"
import { cn } from "~/lib/utils"

interface OnlinePaymentFormProps {
  amount?: string
  label?: string
  cardTokenizeResponseReceived: (
    token: TokenResult,
    verifiedBuyer?: VerifyBuyerResponseDetails | null,
  ) => void | Promise<void>
}

const APP_ID = env.NEXT_PUBLIC_SQUARE_APP_ID
const LOCATION_ID = env.NEXT_PUBLIC_SQUARE_LOCATION_ID
const containerID = "card-container"
const googlePayID = "google-pay-container"
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

const GPayButtonProps = (theme: string) => ({})

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
  // Style card payment according to theme
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

      if (result.status === "OK") {
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

      if (result.status === "OK") {
        return cardTokenizeResponseReceived(result)
      }

      let message = `Tokenization failed with status: ${result.status}`
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`

        throw new Error(message)
      }

      console.warn(message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form id="payment-form" className="grid gap-y-4">
      <div>
        {!card && <Skeleton className="mb-4 h-20 w-full" />}
        <div id={containerID} className="min-h-10" />
        {card && (
          <Button type="button" id={buttonID} ref={btnRef} className="w-full" onClick={handleCardPayment}>
            Pay ${Number(amount)}
          </Button>
        )}
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
    </form>
  )
}

export default OnlinePaymentForm
