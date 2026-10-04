import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { getSession } from "~/lib/auth-server"
import { joinRedirectLink } from "~/lib/typed-links"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"
import ListSessions from "./list"

export default async function SessionPage() {
  const data = await getSession()
  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/profile/settings/sessions` }))
  }

  const sessions = await auth.api.listSessions({
    headers: await headers(),
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-0.5">
        <SidebarTrigger className="-ml-2 md:hidden" />
        <div>
          <h2 className="font-mono text-lg font-medium">Active sessions</h2>
          <p className="text-sm text-muted-foreground">
            View and revoke any and all currently active sessions on your devices
          </p>
        </div>
      </div>
      <Separator className="md:max-w-2xl" />
      <ListSessions current={data.session.id} list={sessions} />
    </div>
  )
}
