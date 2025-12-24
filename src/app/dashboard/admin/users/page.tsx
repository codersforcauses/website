import * as React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { ADMIN_ROLES } from "~/lib/constants"
import { api, HydrateClient } from "~/trpc/server"
import UsersTableContainer from "./table"

export default async function UsersPage({ searchParams }: PageProps<"/dashboard/admin/users">) {
  const { search } = await searchParams
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect("/join")
  if (!data.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) redirect("/dashboard")

  void api.admin.users.getUsers.prefetchInfinite(
    {
      query: (search ?? "").toString(),
      filters: "",
    },
    {
      pages: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  )

  return (
    <div className="relative flex flex-1 flex-col p-4 pt-0">
      <HydrateClient>
        <UsersTableContainer />
      </HydrateClient>
    </div>
  )
}
