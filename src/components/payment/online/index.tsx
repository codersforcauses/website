"use client"

import { type CheckedState } from "@radix-ui/react-checkbox"
import { type PaymentRequestOptions, type Payments, type TokenResult, payments } from "@square/web-sdk"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import * as React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Skeleton } from "~/components/ui/skeleton"
import { toast } from "~/components/ui/use-toast"

import { env } from "~/env"
import { api } from "~/trpc/react"
import { type RouterOutputs } from "~/trpc/shared"

const Card = dynamic(() => import("./card"), {
  ssr: false,
  loading: () => <Skeleton className="h-[97px] w-full @[485px]:h-[48px]" />,
})
const GooglePay = dynamic(() => import("./google-pay"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
})
const ApplePay = dynamic(() => import("./apple-pay"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
})
const SavedCards = dynamic(() => import("./saved-cards"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
})

export interface OnlinePaymentFormProps {
  cards: RouterOutputs["payments"]["getCards"]
  /**
   * The amount to be charged.
   * Must have decimal point and two decimal places.
   * @example "5.00" for $5
   */
  amount?: string
  label?: string
  setFocus?: boolean
  afterPayment?: (paymentID: string) => Promise<void>
}

const APP_ID = env.NEXT_PUBLIC_SQUARE_APP_ID
const LOCATION_ID = env.NEXT_PUBLIC_SQUARE_LOCATION_ID

const createPaymentRequest = ({ amount, label }: PaymentRequestOptions["total"]) => {
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
  cards,
  amount = "5.00",
  label = `CFC Membership ${new Date().getFullYear()}`,
  setFocus = false,
  afterPayment,
}: OnlinePaymentFormProps) => {
  const { resolvedTheme: theme } = useTheme()
  const [canApplePay, setCanApplePay] = React.useState(false)
  const [paymentInstance, setPaymentInstance] = React.useState<Payments>()
  const loadingState = React.useState(false)
  const cardDetails = React.useState<CheckedState>(true)

  const pay = api.payments.pay.useMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to process payment",
        description: "An error occurred while processing your payment. Please try again later.",
      })
    },
  })
  const storeCard = api.payments.storeCard.useMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to store card",
        description:
          "An error occurred trying to store your card. As a result we are unable to process your payment. Please try again later.",
      })
    },
  })

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window?.ApplePaySession) {
      setCanApplePay(true)
    }
  }, [])

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

  const cardTokenizeResponseReceived = async (result: TokenResult) => {
    if (result.errors) {
      // TODO handle errors
      return
    }

    let paymentID: string | undefined = ""
    if (cardDetails[0] && (result?.details?.method as string) === "Card") {
      try {
        const id = await storeCard.mutateAsync({
          sourceID: result.token!,
        })
        paymentID = await pay.mutateAsync({
          sourceID: id!,
          label,
          amount,
        })
      } catch (error) {
        // TODO: handle error
        console.log(error)
      }
    } else {
      try {
        paymentID = await pay.mutateAsync({
          sourceID: result.token!,
          label,
          amount,
        })
      } catch (error) {
        // TODO: handle error
        console.log(error)
      }
    }

    if (paymentID) await afterPayment?.(paymentID)
  }

  const paymentOptions = {
    theme: theme ?? "light",
    paymentInstance: paymentInstance!,
    cardTokenizeResponseReceived,
    loadingState,
  }

  return paymentInstance ? (
    <Accordion
      type="single"
      disabled={loadingState[0]}
      defaultValue={(cards ?? [])?.length > 0 ? "saved" : "card"}
      className="w-full border border-black/25 dark:border-white/25"
    >
      <AccordionItem value="card" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Debit/Credit card</AccordionTrigger>
        <AccordionContent className="mx-4">
          <Card {...paymentOptions} setFocus={setFocus} amount={amount} cardDetails={cardDetails} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="wallet" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Digital wallet</AccordionTrigger>
        <AccordionContent className="mx-4 my-1 grid gap-y-4">
          <GooglePay {...paymentOptions} payRequest={createPaymentRequest({ amount, label })} />
          {canApplePay && <ApplePay {...paymentOptions} payRequest={createPaymentRequest({ amount, label })} />}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="saved" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Saved cards</AccordionTrigger>
        <AccordionContent className="mx-4">
          <SavedCards {...paymentOptions} amount={amount} cards={cards ?? []} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <Skeleton className="h-[320px] w-full" />
  )
}

export default OnlinePaymentForm
