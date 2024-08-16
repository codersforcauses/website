"use client"

import { useClerk } from "@clerk/nextjs"
import { setUser } from "@sentry/nextjs"
import { Button } from "~/components/ui/button"
import { SITE_URL } from "~/lib/constants"
import { api } from "~/trpc/react"

export default function SignOut() {
  const utils = api.useUtils()
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut(
      async () => {
        setUser(null)
        await utils.user.getCurrent.reset()
      },
      {
        redirectUrl: SITE_URL,
      },
    )
  }

  return (
    <main className="main flex items-center justify-center">
      <Button onClick={handleSignOut}>Sign out</Button>
    </main>
  )
}
