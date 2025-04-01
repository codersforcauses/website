import { api } from "~/trpc/server"
import PaymentFormWrapper from "~/components/payment/online/wrapper"
import { getIsMembershipOpen } from "~/lib/utils"

export default async function Dashboard() {
  const user = await api.user.getCurrent.query()

  return (
    <>
      <div className="container flex flex-wrap gap-x-8 gap-y-4 py-12">
        <div className="flex-grow">
          <h2 className="font-bold">Hey, {user?.preferred_name}</h2>
          <div className="flex h-full py-8">
            <p className="self-center">This page is a work in progress. Keep an eye out for updates.</p>
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
              {getIsMembershipOpen() ? (
                <PaymentFormWrapper />
              ) : (
                <p className="text-sm text-warning">
                  Memberships are temporarily closed for the new year. Please check back later.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
