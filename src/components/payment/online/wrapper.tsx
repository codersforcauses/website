"use client"

import { useRouter } from "next/navigation"
import OnlinePaymentForm, { type OnlinePaymentFormProps } from "~/components/payment/online"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"
import { type RouterOutputs } from "~/trpc/shared"

interface PaymentBlockProps extends OnlinePaymentFormProps {
  user: RouterOutputs["user"]["getCurrent"]
}

// wrapped in a client component because the dashboard should be server-rendered
export default function PaymentFormWrapper({ user }: Pick<PaymentBlockProps, "user">) {
  const { data: cards } = api.payment.getCards.useQuery()
  const updateRole = api.user.updateRole.useMutation()
  const router = useRouter()

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

    router.refresh()
  }

  return <OnlinePaymentForm cards={cards} afterPayment={handleAfterPayment} />
}
