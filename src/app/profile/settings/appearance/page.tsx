import { redirect } from "next/navigation"

import { getSession } from "~/lib/auth-server"
import { joinRedirectLink } from "~/lib/typed-links"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"
import AppearanceForm from "./form"

export default async function AppearancePage() {
  const data = await getSession()
  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/profile/settings/appearance` }))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-0.5">
        <SidebarTrigger className="-ml-2 md:hidden" />
        <div>
          <h2 className="font-mono text-lg font-medium">Appearance</h2>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between day and night themes.
          </p>
        </div>
      </div>
      <Separator className="md:max-w-2xl" />
      <AppearanceForm />
    </div>
  )
}
