"use client"

import { useAuth } from "@clerk/nextjs"

import { setUserCookie } from "~/app/actions"
import { api } from "~/trpc/react"

// need to implement a better way
const User = () => {
  const { userId } = useAuth()
  api.user.getCurrent.useQuery(undefined, {
    enabled: !!userId,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    onSuccess: (data) => {
      if (data) void setUserCookie(data)
    },
  })

  return <></>
}

export default User
