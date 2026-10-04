"use client"

import type { Route } from "next"
import Link from "next/link"

import { usePathName } from "~/hooks/use-pathname"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/ui/sidebar"

interface LinkProps {
  title: string
  icon: string
  url: Route
}

const links: LinkProps[] = [
  { title: "Membership", icon: "stars", url: "/profile/settings" },
  { title: "Personal", icon: "face", url: "/profile/settings/personal" },
  {
    title: "Socials",
    icon: "tag",
    url: "/profile/settings/socials",
  },
  { title: "Appearance", icon: "palette", url: "/profile/settings/appearance" },
  { title: "Sessions", icon: "devices", url: "/profile/settings/sessions" },
]

export default function SettingsSidebar() {
  const pathname = usePathName()
  return (
    <Sidebar variant="inset" collapsible="icon" className="relative z-0 -ml-2 h-full py-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    render={
                      <Link href={item.url}>
                        <span className="material-symbols-sharp text-base! leading-none!">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="after:left-0" />
    </Sidebar>
  )
}
