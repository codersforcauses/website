"use client"

import * as React from "react"
import type { Route } from "next"
import Link, { useLinkStatus } from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"

import { usePathName } from "~/hooks/use-pathname"
import { useApi } from "~/trpc/react"
import { Button } from "~/ui/button"
import { Loader } from "~/ui/loader"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/ui/sidebar"

export interface SidebarNavLink {
  title: string
  url: Route
  icon: string
}

function SidebarMenuButtonItem(item: SidebarNavLink) {
  const { pending } = useLinkStatus()
  return (
    <>
      {pending ? (
        <Loader className="shrink-0!" />
      ) : (
        <span className="material-symbols-sharp text-base! leading-none!">{item.icon}</span>
      )}
      <span>{item.title}</span>
    </>
  )
}

export function SidebarMainNav(props: { links: SidebarNavLink[] }) {
  const pathname = usePathName()

  return (
    <SidebarMenu>
      {props.links.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={pathname === item.url}
            render={
              <Link href={item.url}>
                <SidebarMenuButtonItem {...item} />
              </Link>
            }
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function getMeetingIcon(icon: string) {
  switch (icon) {
    case "draft":
      return "edit_calendar"
    case "upcoming":
      return "event_upcoming"
    case "ongoing":
      return "today"
    case "completed":
      return "calendar_lock"
    case "cancelled":
      return "event_busy"
    default:
      return "event"
  }
}

export function SidebarMeetingNav() {
  const { admin } = useApi()
  const pathname = usePathName()
  const [showAllMeetings, setShowAllMeetings] = React.useState(false)
  const { data: meetingLinks } = useSuspenseQuery(admin.generalMeetings.list.queryOptions(showAllMeetings))

  const toggleShowAllMeetings = React.useCallback(() => {
    setShowAllMeetings((prev) => !prev)
  }, [])

  if (meetingLinks.total === 0)
    return (
      <div className="flex h-12 items-center px-2 select-none">
        <p className="text-xs text-muted-foreground-dark">No meetings yet</p>
      </div>
    )

  const links = meetingLinks.data.map((meet) => ({
    id: meet.id,
    title: meet.title,
    url: `/dashboard/admin/general-meeting/${meet.slug}` as Route,
    icon: getMeetingIcon(meet.status),
  }))

  return (
    <SidebarMenu>
      {links.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={pathname === item.url}
            className="relative"
            render={
              <Link href={item.url}>
                <SidebarMenuButtonItem {...item} />
              </Link>
            }
          />
        </SidebarMenuItem>
      ))}
      {meetingLinks.total > 5 && (
        <Button size="sm" variant="ghost-dark" onClick={toggleShowAllMeetings}>
          Show {showAllMeetings ? "less" : "all"}
        </Button>
      )}
    </SidebarMenu>
  )
}
