"use client"

import { useRouter } from "next/navigation"
import OnlinePaymentForm from "~/components/payment/online"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"

// wrapped in a client component because the dashboard should be server-rendered
export default function PaymentFormWrapper() {
  const { data: cards } = api.payments.getCards.useQuery()
  const router = useRouter()

  const handleAfterPayment = async () => {
    toast({
      title: "Successfully updated role",
      description: "You are now a member of Coders for Causes",
    })

    router.refresh()
  }

  return <OnlinePaymentForm cards={cards} afterPayment={handleAfterPayment} />
}
