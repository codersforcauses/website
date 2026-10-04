import { notFound, redirect } from "next/navigation"
import { isToday } from "date-fns"

import { MEETING_ACCESS_ROLES } from "~/lib/constants"
import { joinRedirectLink } from "~/lib/typed-links"
import { getSession } from "~/lib/auth-server"
import { api } from "~/trpc/server"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { Separator } from "~/ui/separator"
import { SidebarTrigger } from "~/ui/sidebar"
import { DraftAlert } from "./alerts"
import SetupTab from "./blocks/tabs/setup"
import DayTab from "./blocks/tabs/day"

export default async function GeneralMeetingPage({ params }: PageProps<"/dashboard/admin/general-meeting/[slug]">) {
  const { slug } = await params
  const data = await getSession()

  if (!data?.user) {
    redirect(joinRedirectLink({ redirect: `/dashboard/admin/general-meeting/${slug}` }))
  }
  if (!data.user.role?.split(",").some((role) => MEETING_ACCESS_ROLES.includes(role))) redirect("/dashboard")

  const meeting = await api.admin.generalMeetings.get(slug)

  if (!meeting) {
    notFound()
  }

  let defaultTab: "setup" | "day" | "results"

  if (isToday(meeting.start)) defaultTab = "day"
  else if (meeting.status === "completed") defaultTab = "results"
  else defaultTab = "setup"

  return (
    <>
      <header className="transition-[width, height] @container/admin-header flex h-(--header-height) w-full shrink-0 items-center gap-2 ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="gap-0">
                <span className="hidden @min-2xl/admin-header:block">CFC General&nbsp;</span>
                Meetings
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{meeting.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="relative flex flex-1 flex-col p-4 pt-0">
        <Tabs defaultValue={defaultTab} className="md:-mt-0.5">
          <TabsList className="w-full md:-mt-11 md:ml-auto md:w-fit">
            <TabsTrigger value="setup" className="w-full md:w-auto">
              Setup
            </TabsTrigger>
            {/* TODO: Rename tabs below */}
            <TabsTrigger value="day" className="w-full md:w-auto">
              On the day
            </TabsTrigger>
            <TabsTrigger value="results" className="w-full md:w-auto">
              Results
            </TabsTrigger>
          </TabsList>
          <TabsContent value="setup">
            <DraftAlert id={meeting.id} initialData={meeting.status} />
            <SetupTab id={meeting.id} slug={slug} />
          </TabsContent>
          <TabsContent value="day">
            <DraftAlert id={meeting.id} initialData={meeting.status} />
            <DayTab id={meeting.id} slug={slug} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
