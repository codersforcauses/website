import * as React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { ADMIN_ROLES } from "~/lib/constants"
import { api, HydrateClient } from "~/trpc/server"
import { Button } from "~/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "~/ui/breadcrumb"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"
import CreateMeetingDialog from "./create-meeting-dialog"

export default async function GeneralMeetingPage({ searchParams }: PageProps<"/dashboard/admin/general-meetings">) {
  const { search } = await searchParams
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect("/join")
  if (!data.user.role?.split(",").some((role) => ADMIN_ROLES.includes(role))) redirect("/dashboard")

  // void api.admin.users.getUsers.prefetchInfinite(
  //   {
  //     query: (search ?? "").toString(),
  //     filters: "",
  //   },
  //   {
  //     pages: 0,
  //     getNextPageParam: (lastPage) => lastPage.nextPage,
  //   },
  // )

  return (
    <>
      <header className="transition-[width, height] flex h-(--header-height) shrink-0 items-center gap-2 ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
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
            <DialogTrigger asChild>
              <Button variant="outline">Create meeting</Button>
            </DialogTrigger>
            <CreateMeetingDialog />
          </Dialog> */}
          {/* <HydrateClient>
          </HydrateClient> */}
        </div>
      </div>
    </>
  )
}
