import { notFound } from "next/navigation"
import { siDiscord } from "simple-icons"
import { createLoader, parseAsBoolean, parseAsInteger } from "nuqs/server"

import { ADMIN_ROLES } from "~/lib/constants"
import { getSession } from "~/lib/auth-server"
import { api, HydrateClient, getQueryClient } from "~/trpc/server"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import { getContributionYears, getUsersContribution, getReposWithUser } from "./github/fetch-data"
import GithubProfile from "./github"

const profileSearchParams = {
  year: parseAsInteger.withDefault(new Date().getFullYear()),
  cfc_only: parseAsBoolean.withDefault(false),
}
const loadSearchParams = createLoader(profileSearchParams)

export default async function ProfilePage(props: PageProps<"/profile/[id]">) {
  const { id } = await props.params
  const user = await api.user.get(id)
  const { year, cfc_only } = await loadSearchParams(props.searchParams)
  const data = await getSession()

  if (!user) notFound()

  if (user?.github) {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(getContributionYears(user.github))
    void queryClient.prefetchQuery(getUsersContribution(user.github, year, cfc_only))
    void queryClient.prefetchQuery(getReposWithUser(user.github, year))
  }

  const roles = user.role?.split(",").map((role) => role.trim())
  const isAdmin = data?.user?.role && ADMIN_ROLES.includes(data.user.role)

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-12">
      <div className="flex gap-4">
        <Avatar size="2xl">
          <AvatarImage src={user.image!} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">
            <span className="sr-only">Preferred name:</span>
            {user.preferredName}
          </p>
          <p>
            <span className="sr-only">Name:</span>
            {user.name}
          </p>
          <p className="text-muted-foreground">{user.pronouns}</p>
          {roles?.map((role) => (
            <Badge key={role} variant="secondary">
              {role}
            </Badge>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-sharp text-base! leading-none! text-muted-foreground">school</span>
            <p className="text-sm">
              {user?.studentNumber ? `UWA ${isAdmin ? user.studentNumber : undefined}` : user?.university}
            </p>
          </div>

          {user?.discord && (
            <Badge
              aria-label={`Discord username of ${user.preferredName}`}
              className="bg-[#5865F2] dark:bg-[#5865F2] dark:text-neutral-50"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="fill-current">
                <path d={siDiscord.path} />
              </svg>
              {user.discord}
            </Badge>
          )}
        </div>
      </div>
      {user?.github && (
        <HydrateClient>
          <GithubProfile username={user.github} />
        </HydrateClient>
      )}
    </div>
  )
}
