import { api } from "~/trpc/server"

import SettingsTabs from "./_components/tabs"

export default async function Settings({ searchParams }: { searchParams: { tab?: string } }) {
  // This will fetch every time a tab is clicked because the searchParams change.
  const user = await api.user.getCurrent.query()

  if (!user) return null

  const defaultValues = {
    name: user?.name ?? "",
    preferred_name: user?.preferred_name ?? "",
    email: user?.email ?? "",
    pronouns: user?.pronouns ?? "",
    isUWA: !!user?.student_number ?? "",
    student_number: user?.student_number ?? undefined,
    uni: user?.university ?? undefined,
    github: user?.github ?? undefined,
    discord: user?.discord ?? undefined,
    subscribe: user?.subscribe ?? true,
  }

  return (
    <div className="container py-8">
      <SettingsTabs defaultValues={defaultValues} currentTab={searchParams?.tab} />
    </div>
  )
}
