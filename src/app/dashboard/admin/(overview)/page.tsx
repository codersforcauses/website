import * as React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { ADMIN_ROLES } from "~/lib/constants"
import CountRow from "./cards/count-row"
import GenderDistribution from "./cards/gender-distribution"
import UsersPerDay from "./cards/users-per-day"

export default async function AdminDashboardPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect("/join")
  if (!data.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) redirect("/dashboard")

  return (
    <div className="grid flex-1 grid-cols-2 gap-4 px-4 pb-4 md:grid-cols-5 lg:max-h-[calc(100svh-var(--header-height))] lg:grid-cols-6">
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <CountRow />
        <div className="@container/gender col-span-2 flex flex-col gap-6 bg-white p-6 dark:bg-neutral-950">
          <h3 className="font-mono text-sm font-medium tracking-tight">Gender distribution</h3>
          <React.Suspense fallback={<div>Loading...</div>}>
            <GenderDistribution />
          </React.Suspense>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-6 bg-white p-6 pt-4 md:col-span-3 lg:col-span-4 dark:bg-neutral-950">
        <React.Suspense fallback={<div>Loading...</div>}>
          <UsersPerDay />
        </React.Suspense>
      </div>
    </div>
  )
}
