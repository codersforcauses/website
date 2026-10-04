import { redirect } from "next/navigation"

import { ADMIN_ROLES } from "~/lib/constants"
import { joinRedirectLink } from "~/lib/typed-links"
import { getSession } from "~/lib/auth-server"
// import { api, prefetch } from "~/trpc/server"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "~/ui/breadcrumb"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"
// import CreateMeetingDialog from "./create-meeting-dialog"

export default async function GeneralMeetingPage({ searchParams }: PageProps<"/dashboard/admin/general-meeting">) {
  const { search } = await searchParams
  const data = await getSession()

  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/dashboard/admin` }))
  }
  if (!data.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) redirect("/dashboard")

  return (
    <>
      <header className="transition-[width, height] flex h-(--header-height) shrink-0 items-center gap-2 ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-2" />
          <Separator orientation="vertical" className="mr-2 w-px data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>CFC General Meetings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="relative flex flex-1 flex-col p-4 pt-0">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* <Dialog>
            <DialogTrigger render={
              <Button variant="outline">Create meeting</Button>
              }/>
            <CreateMeetingDialog />
          </Dialog> */}
          {/* <HydrateClient>
          </HydrateClient> */}
        </div>
      </div>
    </>
  )
}
