"use client"

import type { Route } from "next"
import Link, { useLinkStatus } from "next/link"
import { usePathname } from "next/navigation"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"
import { Spinner } from "~/ui/spinner"

export interface SidebarNavLink {
  title: string
  url: Route
  icon: string
}

function SidebarMainMenuButtonItem(item: SidebarNavLink) {
  const { pending } = useLinkStatus()
  return (
    <>
      <span className="material-symbols-sharp text-base! leading-none!">{item.icon}</span>
      <span>{item.title}</span>
      {pending ? <Spinner className="absolute right-2 ml-auto" /> : null}
    </>
  )
}

export function SidebarMainNav(props: { links: SidebarNavLink[] }) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {props.links.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url} className="relative">
            <Link href={item.url}>
              <SidebarMainMenuButtonItem {...item} />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function SidebarMeetingMenuButtonItem(item: SidebarNavLink) {
  const { pending } = useLinkStatus()
  return (
    <>
      <span className="grid size-4 place-items-center font-mono text-[0.48rem]">
        <span>{item.icon}</span>
      </span>
      <span>{item.title}</span>
      {pending ? <Spinner className="absolute right-2 ml-auto" /> : null}
    </>
  )
}

export function SidebarMeetingNav(props: { links: SidebarNavLink[] }) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {props.links.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url} className="relative">
            <Link href={item.url}>
              <SidebarMeetingMenuButtonItem {...item} />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
