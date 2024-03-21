import * as React from "react"

import OnlinePaymentForm from "~/components/payment/online"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/server"

export default async function Dashboard() {
  const user = await api.user.getCurrent.query()

  const handleAfterOnlinePayment = async (paymentID: string) => {
    "use server"
    try {
      await api.user.updateRole.mutate({
        id: user.id,
        role: "member",
        paymentID,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update role",
        description: "An error occurred while trying to update your role.",
      })
    }
  }

  return (
    <>
      <div className="container flex flex-wrap gap-x-8 gap-y-4 py-8">
        <div className="flex-grow">
          <h2 className="font-bold">Hey, {user?.preferred_name}</h2>
          <div className="flex h-full py-8">
            <p className="self-center">This page is a work in progress. Keep an eye out for updates</p>
          </div>
        </div>
        <div className="max-w-md">
          {user?.role === null && (
            <div className="space-y-4 ">
              <div className="space-y-2">
                <h2 className="font-semibold leading-none tracking-tight">Membership</h2>
                <div className="text-sm text-muted-foreground">
                  <p>
                    You&apos;re not a member with us yet. Become a paying member of Coders for Causes for just $5 a year
                    (ends on 31st Dec {new Date().getFullYear()}). There are many benefits to becoming a member which
                    include:
                  </p>
                  <ul className="list-inside list-disc">
                    <li>discounts to paid events such as industry nights</li>
                    <li>the ability to vote and run for committee positions</li>
                    <li>the ability to join our projects run during the winter and summer breaks.</li>
                  </ul>
                </div>
              </div>
              <OnlinePaymentForm afterPayment={handleAfterOnlinePayment} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
