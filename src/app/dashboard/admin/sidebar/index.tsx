"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import User from "./user"
import { type SidebarNavLink, SidebarMainNav, SidebarMeetingNav } from "./nav"
import { Dialog } from "~/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import CreateMeetingDialog from "./dialogs/create-meeting"
import { api } from "~/trpc/react"

const mainLinks: SidebarNavLink[] = [
  {
    title: "Overview",
    url: "/dashboard/admin",
    icon: "dashboard_2",
  },
  {
    title: "Users",
    url: "/dashboard/admin/users",
    icon: "group",
  },
]

const projectLinks: SidebarNavLink[] = [
  {
    title: "Overview",
    url: "/dashboard/admin/projects/temp",
    icon: "dashboard_2",
  },
]

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [meetingDialogOpen, setMeetingDialogOpen] = React.useState(false)

  const { data: meetings } = api.admin.generalMeetings.getAll.useQuery()

  const meetingLinks: SidebarNavLink[] =
    meetings?.map((meeting) => ({
      title: meeting.title,
      url: `/dashboard/admin/general-meetings/${meeting.slug}` as unknown as SidebarNavLink["url"],
      icon: String(meeting.start.getFullYear()).slice(2),
    })) ?? []

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-(--header-height)">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center bg-white">
              <span className="font-mono text-sm font-semibold text-black">cfc</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Coders for Causes</span>
              <span className="truncate text-neutral-400">Admin Dashboard</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <React.Suspense fallback={null}>
              <SidebarMainNav links={mainLinks} />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <span className="material-symbols-sharp text-base! leading-none!">add</span>
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <React.Suspense fallback={null}>
              <SidebarMainNav links={projectLinks} />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>General meetings</SidebarGroupLabel>
          <Dialog open={meetingDialogOpen} onOpenChange={setMeetingDialogOpen}>
            <DialogTrigger asChild>
              <SidebarGroupAction title="Add General Meeting">
                <span className="material-symbols-sharp text-base! leading-none!">add</span>
                <span className="sr-only">Add General Meeting</span>
              </SidebarGroupAction>
            </DialogTrigger>
            <React.Suspense fallback={null}>
              <CreateMeetingDialog onSuccess={() => setMeetingDialogOpen(false)} />
            </React.Suspense>
          </Dialog>
          <SidebarGroupContent>
            <React.Suspense fallback={null}>
              <SidebarMeetingNav links={meetingLinks} />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <User />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
