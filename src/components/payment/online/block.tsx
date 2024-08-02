"use client"

import OnlinePaymentForm from "~/components/payment/online"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"
import { type RouterOutputs } from "~/trpc/shared"

export default function OnlinePaymentBlock({ user }: { user: RouterOutputs["user"]["getCurrent"] }) {
  const { mutateAsync: updateRole } = api.user.updateRole.useMutation()

  const handleAfterOnlinePayment = async (paymentID: string) => {
    try {
      await updateRole({
        id: user.id,
        role: "member",
        paymentID,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Failed to update role",
        description: "An error occurred while trying to update your role.",
      })
    }
  }

  return <OnlinePaymentForm afterPayment={handleAfterOnlinePayment} />
}
