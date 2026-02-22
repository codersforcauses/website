import * as React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { MEETING_ACCESS_ROLES } from "~/lib/constants"
import { api, HydrateClient } from "~/trpc/server"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/ui/breadcrumb"
import { Separator } from "~/ui/separator"
import { Skeleton } from "~/ui/skeleton"
import { SidebarTrigger } from "~/ui/sidebar"
import PositionsCard from "./cards/positions"
import AgendaCard from "./cards/agenda"
import QuestionsCard from "./cards/questions"
import StatusCard from "./cards/status"

export default async function GeneralMeetingPage({ params }: PageProps<"/dashboard/admin/general-meetings/[slug]">) {
  const { slug } = await params
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  if (!data?.user) redirect(`/join?redirect=/dashboard/admin/general-meetings/${slug}`)
  if (!data.user.role?.split(",").some((role) => MEETING_ACCESS_ROLES.includes(role))) redirect("/dashboard")

  void api.generalMeetings.get.prefetch({ slug })

  return (
    <>
      <header className="transition-[width, height] flex h-(--header-height) shrink-0 items-center gap-2 ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>CFC General Meetings</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{slug}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="relative flex flex-1 flex-col p-4 pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <HydrateClient>
            <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <PositionsCard />
            </React.Suspense>
            <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <QuestionsCard />
            </React.Suspense>
            <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <AgendaCard />
            </React.Suspense>
            <React.Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <StatusCard />
            </React.Suspense>
          </HydrateClient>
        </div>
      </div>
    </>
  )
}
