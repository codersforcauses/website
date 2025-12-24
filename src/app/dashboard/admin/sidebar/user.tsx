"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

import { authClient } from "~/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar"

export default function NavUser() {
  const router = useRouter()
  const { data, isPending } = authClient.useSession()
  const { isMobile } = useSidebar()
  const userSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-neutral-900">
              <Avatar className="size-8 border">
                <AvatarImage
                  src={data?.user.image ?? undefined}
                  alt={data?.user.name ? `${data?.user.preferredName}'s avatar` : "User avatar"}
                />
                <AvatarFallback className="bg-neutral-900 dark:bg-neutral-900">
                  {data?.user.preferredName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm">
                <span className="truncate leading-4 font-medium">{data?.user.name}</span>
                <span className="truncate text-xs text-neutral-400">{data?.user.email}</span>
              </div>
              <span className="material-symbols-sharp text-base! leading-none! text-neutral-400">unfold_more</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            variant="dark"
            align="end"
            side={isMobile ? "bottom" : "top"}
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <span className="material-symbols-sharp">dashboard</span>
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/profile/${data?.user.id}`}>
                  <span className="material-symbols-sharp">person</span>
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/settings">
                  <span className="material-symbols-sharp">settings_account_box</span>
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={userSignOut}>
              <span className="material-symbols-sharp">logout</span>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
