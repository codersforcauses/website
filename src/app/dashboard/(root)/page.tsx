import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { getIsMembershipOpen } from "~/lib/utils"

export default async function DashboardPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect("/join")

  return (
    <div className="container mx-auto flex flex-wrap gap-x-8 gap-y-4 px-4 py-12">
      <div className="flex-grow">
        <h2 className="font-bold">Hey, {data.user.preferredName}</h2>
        <div className="flex h-full py-8">
          <p className="self-center">This page is a work in progress. Keep an eye out for updates.</p>
        </div>
      </div>
      <div className="max-w-md">
        {data.user.role && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="leading-none font-semibold tracking-tight">Membership</h2>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
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
              <>{/* <PaymentFormWrapper /> */}</>
            ) : (
              <p className="text-warning text-sm">
                Memberships are temporarily closed for the new year. Please check back later.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
