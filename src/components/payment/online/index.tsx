"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import {
  payments,
  type TokenResult,
  type Payments,
  // type StoreVerifyBuyerDetails,
  type PaymentRequestOptions,
} from "@square/web-sdk"
import { type CheckedState } from "@radix-ui/react-checkbox"

import { env } from "~/env"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Skeleton } from "~/components/ui/skeleton"
// import { getUserCookie } from "~/app/actions"
import { api } from "~/trpc/react"
import { toast } from "~/components/ui/use-toast"

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

interface OnlinePaymentFormProps {
  /**
   * The amount to be charged.
   * Must have decimal point and two decimal places.
   * @example "5.00" for $5
   */
  amount?: string
  label?: string
  afterPayment?: (paymentID: string) => Promise<void>
}

const APP_ID = env.NEXT_PUBLIC_SQUARE_APP_ID
const LOCATION_ID = env.NEXT_PUBLIC_SQUARE_LOCATION_ID

// const storeVerificationDetails = (user: User) => {
//   const details: StoreVerifyBuyerDetails = {
//     intent: "STORE",
//     billingContact: {
//       familyName: user.full_name,
//       givenName: user.preferred_name,
//       email: user.email,
//     },
//   }
//   return details
// }

const createPaymentRequest = ({ amount, label }: Omit<Required<OnlinePaymentFormProps>, "afterPayment">) => {
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
  label = `CFC Membership ${new Date().getFullYear()}`,
  ...props
}: OnlinePaymentFormProps) => {
  const { resolvedTheme: theme } = useTheme()
  const [canApplePay, setCanApplePay] = React.useState(false)
  const [paymentInstance, setPaymentInstance] = React.useState<Payments>()
  // const [user, setUser] = React.useState<User>()
  const loadingState = React.useState(false)
  const cardDetails = React.useState<CheckedState>(true)

  // const userDetails = props.user ? props.user : getUserCookie()

  const pay = api.payment.pay.useMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to process payment",
        description: "An error occurred while processing your payment. Please try again later.",
      })
    },
  })
  const storeCard = api.payment.storeCard.useMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Unable to store card",
        description:
          "An error occurred trying to store your card. As a result we are unable to process your payment. Please try again later.",
      })
    },
  })

  // React.useEffect(() => {
  //   void getUserCookie().then((user) => {
  //     if (!user) setUser(props.user)
  //     else {
  //       setUser({
  //         email: user.email,
  //         preferred_name: user.preferred_name,
  //         full_name: user.name,
  //         customerID: user.square_customer_id,
  //       })
  //     }
  //   })
  // }, [props.user, userDetails])

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

    // if (!user) throw new Error("User details must be provided to verify payment method")

    // const verifyBuyerResults = await paymentInstance?.verifyBuyer(String(result.token), storeVerificationDetails(user))
    let paymentID: string | undefined = ""
    if (cardDetails[0] && (result?.details?.method as string) === "Card") {
      try {
        const id = await storeCard.mutateAsync({
          sourceID: result.token!,
          // verificationToken: verifyBuyerResults!.token,
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
    if (paymentID) props.afterPayment?.(paymentID)
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
      defaultValue="card"
      className="w-full border border-black/25 dark:border-white/25"
    >
      <AccordionItem value="card" className="border-black/25 dark:border-white/25">
        <AccordionTrigger className="px-4">Debit/Credit card</AccordionTrigger>
        <AccordionContent className="mx-4">
          <Card {...paymentOptions} amount={amount} cardDetails={cardDetails} />
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
          <SavedCards {...paymentOptions} amount={amount} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <Skeleton className="h-[320px] w-full" />
  )
}

export default OnlinePaymentForm
