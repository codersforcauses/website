import { api } from "~/trpc/server"
import SettingsForm from "./form"

export default async function Settings() {
  const currentUser = await api.user.getCurrent.query()

  const defaultValues = currentUser && {
    name: currentUser.name,
    preferred_name: currentUser.preferred_name,
    email: currentUser.email,
    pronouns: currentUser.pronouns,
    isUWA: !!currentUser.student_number,
    student_number: currentUser.student_number ?? undefined,
    uni: currentUser.university ?? undefined,
    github: currentUser.github ?? undefined,
    discord: currentUser.discord ?? undefined,
    subscribe: currentUser.subscribe,
  }

  return (
    <div className="container py-8">
      <SettingsForm defaultValues={defaultValues} />
    </div>
  )
}
