import { redirect } from "next/navigation"

import { ADMIN_ROLES } from "~/lib/constants"
import { getSession } from "~/lib/auth-server"
import { joinRedirectLink } from "~/lib/typed-links"
import { HydrateClient, prefetch, trpc } from "~/trpc/server"
import UsersTableContainer from "./table"

export default async function UsersPage({ searchParams }: PageProps<"/dashboard/admin/users">) {
  const { search } = await searchParams
  const data = await getSession()

  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/dashboard/admin/users` }))
  }
  if (!data.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) redirect("/dashboard")

  prefetch(
    trpc.admin.users.listUsers.infiniteQueryOptions(
      {
        query: (search ?? "").toString(),
        filters: "",
        cursor: 0,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    ),
  )

  return (
    <div className="relative flex flex-1 flex-col p-4 pt-0">
      <HydrateClient>
        <UsersTableContainer />
      </HydrateClient>
    </div>
  )
}
