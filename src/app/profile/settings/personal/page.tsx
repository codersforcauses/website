import { redirect } from "next/navigation"

import { getSession } from "~/lib/auth-server"
import { UNIVERSITIES } from "~/lib/constants"
import { joinRedirectLink } from "~/lib/typed-links"
import { SidebarTrigger } from "~/ui/sidebar"
import { Separator } from "~/ui/separator"
import PersonalForm from "./form"

export default async function PersonalPage() {
  const data = await getSession()
  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/profile/settings/personal` }))
  }

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
      <div className="flex gap-0.5">
        <SidebarTrigger className="-ml-2 md:hidden" />
        <div>
          <h2 className="font-mono text-lg font-medium">Personal details</h2>
          <p className="text-sm text-muted-foreground">Update your personal details. All fields here are required.</p>
        </div>
      </div>
      <Separator className="md:max-w-2xl" />
      <PersonalForm defaultValues={defaultValues} />
    </div>
  )
}
