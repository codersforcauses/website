"use client"

import { setUserCookie } from "~/app/actions"
import { api } from "~/trpc/react"

// need to implement a better way
const User = () => {
  api.user.getCurrent.useQuery(undefined, {
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    onSuccess: (data) => {
      if (data) void setUserCookie(data)
    },
  })

  return <></>
}

export default User
