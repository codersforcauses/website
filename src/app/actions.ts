"use server"

import { cookies } from "next/headers"

import { type User } from "~/lib/types"
import { env } from "~/env"

const key = new TextEncoder().encode(env.SECRET_KEY)
const iv = new TextEncoder().encode(env.SECRET_IV)

const encryptSymmetric = async (plaintext: string) => {
  // encode the text you want to encrypt
  const encodedPlaintext = new TextEncoder().encode(plaintext)
  // prepare the secret key for encryption
  const secretKey = await crypto.subtle.importKey(
    "raw",
    key,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )

  // encrypt the text with the secret key
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    secretKey,
    encodedPlaintext,
  )

  // return the encrypted text "ciphertext" and the IV
  return Buffer.from(ciphertext).toString("base64")
}

const decryptSymmetric = async (ciphertext: string) => {
  // prepare the secret key
  const secretKey = await crypto.subtle.importKey(
    "raw",
    key,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )

  // decrypt the encrypted text "ciphertext" with the secret key and IV
  const cleartext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    secretKey,
    Buffer.from(ciphertext, "base64"),
  )

  // decode the text and return it
  return new TextDecoder().decode(cleartext)
}

export async function setUserCookie(userData: User) {
  if (!userData) return
  const user = encodeURIComponent(JSON.stringify(userData))
  const encryptedUser = await encryptSymmetric(user)

  cookies().set("user", encryptedUser, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  })
}

export async function getUserCookie() {
  const encryptedUser = cookies().get("user")?.value
  if (!encryptedUser) return
  const getUser = await decryptSymmetric(encryptedUser)
  const tempUser = JSON.parse(decodeURIComponent(getUser)) as User
  const user = {
    ...tempUser,
    createdAt: new Date(tempUser.createdAt),
    updatedAt: tempUser.updatedAt ? new Date(tempUser.updatedAt) : null,
  } satisfies User

  return user
}

export async function hasUserCookie() {
  return cookies().has("user")
}

export async function removeUserCookie() {
  cookies().delete("user")
}
