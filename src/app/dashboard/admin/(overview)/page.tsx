import * as React from "react"
import { redirect } from "next/navigation"

import { ADMIN_ROLES } from "~/lib/constants"
import { joinRedirectLink } from "~/lib/typed-links"
import { getSession } from "~/lib/auth-server"
import { HydrateClient, prefetch, trpc } from "~/trpc/server"
import CountRow from "./cards/count-row"
import GenderDistribution from "./cards/gender-distribution"

export default async function AdminDashboardPage() {
  const data = await getSession()

  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/dashboard/admin` }))
  }
  if (!data.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) redirect("/dashboard")

  prefetch(trpc.admin.analytics.getGenderStatistics.queryOptions())
  prefetch(trpc.admin.analytics.getUsersPerDay.queryOptions(1))
  // prefetch(trpc.admin.analytics.getUsersPerDay.queryOptions(0))
  // prefetch(trpc.admin.analytics.getUsersPerDay.queryOptions(3))
  // prefetch(trpc.admin.analytics.getUsersPerDay.queryOptions(6))
  // prefetch(trpc.admin.analytics.getUsersPerDay.queryOptions(12))

  return (
    <HydrateClient>
      <div className="grid flex-1 grid-cols-2 gap-4 px-4 pb-4 md:grid-cols-5 lg:max-h-[calc(100svh-var(--header-height))] lg:grid-cols-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <CountRow />
          <div className="@container/gender col-span-2 flex flex-col gap-6 bg-background p-6">
            <h3 className="text-sm font-medium tracking-tight">Gender distribution</h3>
            <React.Suspense fallback={<div>Loading...</div>}>
              <GenderDistribution />
            </React.Suspense>
          </div>
        </div>
        {/* <div className="col-span-2 flex flex-col gap-6 bg-background p-6 pt-4 md:col-span-3 lg:col-span-4">
          <React.Suspense fallback={<div>Loading...</div>}>
            <UsersPerDay />
          </React.Suspense>
        </div> */}
      </div>
    </HydrateClient>
  )
}
