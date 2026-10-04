"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

import { authClient } from "~/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/ui/sidebar"
import { Skeleton } from "~/ui/skeleton"

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
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton disabled={isPending} size="lg" className="data-popup-open:bg-muted-dark">
                <Avatar className="size-8 border">
                  <AvatarImage
                    src={data?.user.image ?? undefined}
                    alt={data?.user.name ? `${data?.user.preferredName}'s avatar` : "User avatar"}
                  />
                  <AvatarFallback className="bg-primary-foreground-dark">
                    {data?.user.preferredName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm">
                  {isPending ? (
                    <div className="grid gap-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ) : (
                    <>
                      <span className="truncate leading-4 font-medium">{data?.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground-dark">{data?.user.email}</span>
                    </>
                  )}
                </div>
                <span className="material-symbols-sharp text-base! leading-none! text-muted-foreground-dark">
                  unfold_more
                </span>
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            variant="dark"
            align="end"
            side={isMobile ? "bottom" : "top"}
            className="w-(--anchor-width) min-w-56"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link href="/dashboard">
                    <span className="material-symbols-sharp">dashboard</span>
                    <span>Dashboard</span>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link href={`/profile/${data?.user.id}`}>
                    <span className="material-symbols-sharp">person</span>
                    <span>Profile</span>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link href="/profile/settings">
                    <span className="material-symbols-sharp">settings_account_box</span>
                    <span>Settings</span>
                  </Link>
                }
              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={userSignOut}>
              <span className="material-symbols-sharp">logout</span>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
