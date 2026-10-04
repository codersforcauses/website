"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { track } from "@vercel/analytics/react"
// import { setUser } from "@sentry/nextjs";

import { authClient } from "~/lib/auth-client"
import { ADMIN_ROLES } from "~/lib/constants"
import { usePathName } from "~/hooks/use-pathname"
import { Avatar, AvatarFallback } from "~/ui/avatar"
import { Button, buttonVariants } from "~/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu"
import { Skeleton } from "~/ui/skeleton"

const ThemeSwitcher = dynamic(() => import("./theme"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost-dark" size="icon">
      <span className="size-4 bg-muted-dark" />
    </Button>
  ),
})

export default function UserButton() {
  const path = usePathName()
  const router = useRouter()
  const { data, isPending } = authClient.useSession()
  const isAdmin = data?.user?.role && ADMIN_ROLES.includes(data.user.role)

  const userSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }
  if (isPending) {
    return (
      <>
        <ThemeSwitcher />
        <Skeleton className="h-9 w-24 bg-muted-dark" />
      </>
    )
  }
  if (!data?.user) {
    return (
      <>
        <ThemeSwitcher />
        <Link
          href="/join"
          className={buttonVariants({
            variant: "secondary-dark",
          })}
          onNavigate={() => {
            if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("join", { location: "header" })
          }}
        >
          Join us
        </Link>
      </>
    )
  }
  return (
    <>
      {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost-dark" className="max-w-40 bg-black px-2 data-popup-open:bg-accent-dark">
              <Avatar size="sm">
                <AvatarFallback className="bg-background-dark">{data.user?.preferredName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{data.user?.preferredName}</span>
            </Button>
          }
        />
        <DropdownMenuContent variant="dark" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={path === "/dashboard"}
              render={
                <Link href="/dashboard">
                  <span className="material-symbols-sharp">dashboard</span>
                  <span>Dashboard</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </Link>
              }
            />
            {isAdmin && (
              <DropdownMenuItem
                disabled={path === "/dashboard/admin"}
                render={
                  <Link href="/dashboard/admin">
                    <span className="material-symbols-sharp">admin_panel_settings</span>
                    <span>Admin Dashboard</span>
                    {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                  </Link>
                }
              />
            )}
            <DropdownMenuItem
              disabled={path.includes(`/profile/${data.user.id}`)}
              render={
                <Link href={`/profile/${data.user.id}`}>
                  <span className="material-symbols-sharp">person</span>
                  <span>Profile</span>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </Link>
              }
            />
            <DropdownMenuItem
              disabled={path === "/profile/settings"}
              render={
                <Link href="/profile/settings">
                  <span className="material-symbols-sharp">settings_account_box</span>
                  <span>Settings</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </Link>
              }
            />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            // className="focus:bg-neutral-800 focus:text-neutral-50 dark:focus:bg-neutral-800"
            onSelect={userSignOut}
          >
            <span className="material-symbols-sharp">logout</span>
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
