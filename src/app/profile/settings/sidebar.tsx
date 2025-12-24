"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"

const links = [
  { title: "Membership", icon: "stars", url: "/profile/settings" },
  { title: "Personal", icon: "face", url: "/profile/settings/personal" },
  {
    title: "Socials",
    icon: "tag",
    url: "/profile/settings/socials",
  },
  { title: "Appearance", icon: "palette", url: "/profile/settings/appearance" },
  // { text: "Notifications", icon: "notifications", url: "/profile/settings/notifications" },
]

export default function SettingsSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar variant="inset" collapsible="icon" className="relative z-0 -ml-2 h-full py-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                  <Link href={item.url}>
                    <span className="material-symbols-sharp text-base! leading-none!">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="after:left-0" />
    </Sidebar>
  )
}
