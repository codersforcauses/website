"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { getUserCookie, removeUserCookie } from "~/app/actions"
import { type User } from "~/lib/types"

const UserButton = () => {
  const [user, setUser] = React.useState<User>()
  const router = useRouter()
  const { isSignedIn, signOut } = useAuth()

  React.useEffect(() => {
    const getUser = async () => {
      if (!isSignedIn) return
      const getUser = await getUserCookie()
      setUser(getUser)
    }
    getUser().catch((e) => console.error(e))
  }, [isSignedIn])

  const userSignOut = React.useCallback(async () => {
    await Promise.all([removeUserCookie(), signOut()])
    router.push("/")
  }, [signOut, router])

  if (!isSignedIn || !user)
    return (
      <Button asChild variant="secondary-dark">
        <Link href="/join">Join us</Link>
      </Button>
    )

  const isAdmin = user.role === "admin" || user.role === "committee"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline-dark" className="text-white">
          {user?.preferred_name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-56 border-white/25 bg-black text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="focus:bg-white/20 focus:text-white">
            <Link href="/dashboard">
              <span className="material-symbols-sharp text mr-1 text-xl leading-none">dashboard</span>
              <span>Dashboard</span>
            </Link>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem asChild className="focus:bg-white/20 focus:text-white">
              <Link href="/dashboard/admin">
                <span className="material-symbols-sharp text mr-1 text-xl leading-none">admin_panel_settings</span>
                <span>Admin Dashboard</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild className="focus:bg-white/20 focus:text-white">
            <Link href={`/profile/${user?.id}`}>
              <span className="material-symbols-sharp text mr-1 text-xl leading-none">person</span>
              <span>Profile</span>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus:bg-white/20 focus:text-white">
            <Link href="/profile/settings">
              <span className="material-symbols-sharp text mr-1 text-xl leading-none">settings</span>
              <span>Settings</span>
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-white/20 focus:text-white">
            <span className="material-symbols-sharp text mr-1 text-xl leading-none">keyboard_keys</span>
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/25" />
        <DropdownMenuItem className="focus:bg-white/20 focus:text-white" onSelect={userSignOut}>
          <span className="material-symbols-sharp text mr-1 text-xl leading-none">logout</span>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
