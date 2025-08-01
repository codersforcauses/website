"use client"

import { useAuth } from "@clerk/nextjs"
import { setUser } from "@sentry/nextjs"
import { track } from "@vercel/analytics/react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

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

import { SITE_URL } from "~/lib/constants"
import { type User } from "~/server/db/types"
import { api } from "~/trpc/react"

const ThemeSwitcher = dynamic(() => import("./theme"), {
  ssr: false,
  loading: () => <Button variant="ghost-dark" size="icon" />,
})

interface HeaderUser {
  cachedUser?: User
}

const UserButton = ({ cachedUser }: HeaderUser) => {
  const { userId, signOut } = useAuth()
  const path = usePathname()
  const utils = api.useUtils()

  const { data: user } = api.users.getCurrent.useQuery(undefined, {
    enabled: !!userId,
    placeholderData: cachedUser,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  })

  // track sentry user
  React.useEffect(() => {
    if (!user) return
    setUser(user)
  }, [user])

  // TODO move to new page to handle
  const userSignOut = React.useCallback(async () => {
    await utils.users.getCurrent.reset()
    setUser(null)
    await signOut({
      redirectUrl: SITE_URL,
    })
  }, [signOut, utils.users])

  if (!user || !userId)
    return (
      <div className="flex gap-2">
        <ThemeSwitcher />
        <Button
          asChild
          variant="secondary-dark"
          className="dark:hover:bg-primary dark:hover:text-black"
          onClick={() => {
            if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("join", { location: "header" })
          }}
        >
          <Link href="/join">Join us</Link>
        </Button>
      </div>
    )

  const isAdmin = user?.role === "admin" || user?.role === "committee"

  return (
    <div className="flex">
      <ThemeSwitcher />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost-dark" className="max-w-40 space-x-2 text-white">
            <Avatar size="sm">
              <AvatarFallback className="bg-neutral-800">{Array.from(user?.preferred_name ?? "?")[0]}</AvatarFallback>
            </Avatar>
            <span>{user?.preferred_name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="-mr-1.5 mt-1 w-56 border-white/25 bg-black text-white ">
          <DropdownMenuGroup>
            <DropdownMenuItem
              asChild
              disabled={path === "/dashboard"}
              className=" hover:cursor-pointer focus:bg-white/20 focus:text-white"
            >
              <Link href="/dashboard">
                <span className="material-symbols-sharp text mr-1 size-5 text-xl leading-none">dashboard</span>
                <span>Dashboard</span>
              </Link>
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem
                asChild
                disabled={path === "/dashboard/admin"}
                className="hover:cursor-pointer focus:bg-white/20 focus:text-white"
              >
                <Link href="/dashboard/admin">
                  <span className="material-symbols-sharp text mr-1 size-5 text-xl leading-none">
                    admin_panel_settings
                  </span>
                  <span>Admin Dashboard</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              asChild
              disabled={path.includes(`/profile/${user?.id}`)}
              className="hover:cursor-pointer focus:bg-white/20 focus:text-white"
            >
              <Link href={`/profile/${user?.id}`}>
                <span className="material-symbols-sharp text mr-1 size-5 text-xl leading-none">person</span>
                <span>Profile</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              disabled={path === "/profile/settings"}
              className="hover:cursor-pointer focus:bg-white/20 focus:text-white"
            >
              <Link href="/profile/settings">
                <span className="material-symbols-sharp text mr-1 size-5 text-xl leading-none">
                  settings_account_box
                </span>
                <span>Settings</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="focus:bg-white/20 focus:text-white">
            <span className="mr-1 text-xl leading-none material-symbols-sharp text size-5">keyboard_keys</span>
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-white/25" />
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-white/20 focus:text-white" onSelect={userSignOut}>
            <span className="material-symbols-sharp text mr-1 size-5 text-xl leading-none">logout</span>
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
