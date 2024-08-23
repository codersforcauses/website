"use client"

import OnlinePaymentForm, { type OnlinePaymentFormProps } from "~/components/payment/online"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"
import { RouterOutputs } from "~/trpc/shared"

interface PaymentBlockProps extends OnlinePaymentFormProps {
  user: RouterOutputs["user"]["getCurrent"]
}

// wrapped in a client component because the dashboard should be server-rendered
export default function PaymentFormWrapper({ cards, user }: PaymentBlockProps) {
  const updateRole = api.user.updateRole.useMutation()

  const handleAfterPayment = async (paymentID: string) => {
    await updateRole.mutateAsync({
      id: user.id,
      role: "member",
      paymentID,
    })

    toast({
      title: "Successfully updated role",
      description: "You are now a member of Coders for Causes",
    })
  }

  return <OnlinePaymentForm cards={cards} afterPayment={handleAfterPayment} />
}
