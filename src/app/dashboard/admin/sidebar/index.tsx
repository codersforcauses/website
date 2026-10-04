import * as React from "react"

import { trpc, HydrateClient, prefetch } from "~/trpc/server"
import { Dialog, DialogTrigger } from "~/ui/dialog"
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
} from "~/ui/sidebar"
import CreateMeetingDialog from "./dialogs/create-meeting"
import { type SidebarNavLink, SidebarMainNav, SidebarMeetingNav } from "./nav"
import { MeetingSkeleton } from "./skeletons"
import User from "./user"

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
    url: "/dashboard/admin/projects/:temp",
    icon: "dashboard_2",
  },
]

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  prefetch(trpc.admin.generalMeetings.list.queryOptions(false))

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
              <span className="truncate text-muted-foreground-dark">Admin Dashboard</span>
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
          <Dialog>
            <DialogTrigger
              render={
                <SidebarGroupAction title="Add General Meeting">
                  <span className="material-symbols-sharp text-base! leading-none!">add</span>
                  <span className="sr-only">Add General Meeting</span>
                </SidebarGroupAction>
              }
            />
            <CreateMeetingDialog />
          </Dialog>
          <SidebarGroupContent>
            <HydrateClient>
              <React.Suspense fallback={<MeetingSkeleton />}>
                <SidebarMeetingNav />
              </React.Suspense>
            </HydrateClient>
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
