"use server"

import { cookies } from "next/headers"

import { type User } from "~/lib/types"

export async function setUserCookie(userData: User) {
  if (!userData) return
  const user = encodeURIComponent(JSON.stringify(userData))

  cookies().set("user", user, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  })
}

export async function getUserCookie() {
  const getUser = cookies().get("user")?.value
  if (!getUser) return
  const tempUser = JSON.parse(decodeURIComponent(getUser)) as User
  const user = {
    ...tempUser,
    createdAt: new Date(tempUser.createdAt),
  } satisfies User

  return user
}

export async function removeUserCookie() {
  cookies().delete("user")
}
