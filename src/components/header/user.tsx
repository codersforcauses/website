"use client"

import * as React from "react"
// import { setUser } from "@sentry/nextjs";
import { track } from "@vercel/analytics/react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { authClient } from "~/lib/auth-client"
import { Skeleton } from "~/ui/skeleton"

const ThemeSwitcher = dynamic(() => import("./theme"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost-dark" size="icon">
      <span className="size-4 bg-neutral-800" />
    </Button>
  ),
})

const adminRoles = ["admin", "committee"]

export default function UserButton() {
  const path = usePathname()
  const router = useRouter()
  const { data, isPending } = authClient.useSession()
  const isAdmin = data?.user?.role && adminRoles.includes(data.user.role)

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
        <Skeleton className="h-9 w-24 bg-neutral-800" />
      </>
    )
  }
  if (!data?.user) {
    return (
      <>
        <ThemeSwitcher />
        <Button
          asChild
          variant="secondary-dark"
          className="focus-visible:ring-white/25 dark:hover:bg-white dark:hover:text-neutral-950"
          onClick={() => {
            if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("join", { location: "header" })
          }}
        >
          <Link href="/join">Join us</Link>
        </Button>
      </>
    )
  }
  return (
    <>
      {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost-dark"
            className="max-w-40 space-x-1.5 bg-black pr-2 pl-0.5 text-neutral-50 focus-visible:ring-white/25"
          >
            <Avatar size="sm">
              <AvatarFallback className="bg-neutral-900 dark:bg-neutral-900">
                {data.user?.preferredName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>{data.user?.preferredName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent variant="dark" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild disabled={path === "/dashboard"}>
              <Link href="/dashboard">
                <span className="material-symbols-sharp">dashboard</span>
                <span>Dashboard</span>
              </Link>
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild disabled={path === "/dashboard/admin"}>
                <Link href="/dashboard/admin">
                  <span className="material-symbols-sharp">admin_panel_settings</span>
                  <span>Admin Dashboard</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild disabled={path.includes(`/profile/${data.user.id}`)}>
              <Link href={`/profile/${data.user.id}`}>
                <span className="material-symbols-sharp">person</span>
                <span>Profile</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled={path === "/profile/settings"}>
              <Link href="/profile/settings">
                <span className="material-symbols-sharp">settings_account_box</span>
                <span>Settings</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
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
