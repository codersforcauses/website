import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { UNIVERSITIES } from "~/lib/constants"
import { Separator } from "~/ui/separator"
import PersonalForm from "./form"

export default async function PersonalPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect("/join")

  const defaultValues = {
    name: data.user.name,
    preferredName: data.user.preferredName,
    email: data.user.email,
    pronouns: data.user.pronouns,
    isUWA: !!data.user.studentNumber,
    studentNumber: data.user.studentNumber ?? undefined,
    uni: data.user.university ?? UNIVERSITIES[0].value,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Personal details</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Update your personal details. All fields here are required.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <PersonalForm defaultValues={defaultValues} />
    </div>
  )
}
