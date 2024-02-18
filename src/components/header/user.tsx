"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

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
import { getUserCookie, removeUserCookie } from "~/app/actions"
import { type User } from "~/lib/types"

const UserButton = () => {
  const [user, setUser] = React.useState<User>()
  const router = useRouter()
  const { signOut } = useAuth()
  const path = usePathname()

  React.useEffect(() => {
    const getUser = async () => {
      const getUser = await getUserCookie()
      setUser(getUser)
    }
    if (!user) void getUser()
  }, [user])

  const userSignOut = React.useCallback(async () => {
    await Promise.all([removeUserCookie(), signOut()])
    setUser(undefined)
    router.push("/")
  }, [signOut, router])

  if (!user)
    return (
      <Button asChild variant="secondary-dark" className="dark:hover:bg-primary dark:hover:text-black">
        <Link href="/join">Join us</Link>
      </Button>
    )

  const isAdmin = user?.role === "admin" || user?.role === "committee"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary-dark" className="text-white">
          {user?.preferred_name}
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
              <span className="material-symbols-sharp text mr-1 size-5 text-xl leading-none">settings</span>
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
  )
}

export default UserButton
