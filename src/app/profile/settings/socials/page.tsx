import { redirect } from "next/navigation"

import { getSession } from "~/lib/auth-server"
import { joinRedirectLink } from "~/lib/typed-links"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"
import SocialForm from "./form"

export default async function SocialPage() {
  const data = await getSession()
  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/profile/settings/socials` }))
  }

  const defaultValues = {
    github: data.user.github ?? undefined,
    discord: data.user.discord ?? undefined,
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-0.5">
        <SidebarTrigger className="-ml-2 md:hidden" />
        <div>
          <h2 className="font-mono text-lg font-medium">Your socials</h2>
          <p className="text-sm text-muted-foreground">
            These fields are optional but are required if you plan on applying for projects during the winter and summer
            breaks.
          </p>
        </div>
      </div>
      <Separator className="md:max-w-2xl" />
      <SocialForm defaultValues={defaultValues} />
    </div>
  )
}
