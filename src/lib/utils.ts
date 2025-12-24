import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function getIsMembershipOpen() {
  const date = new Date()
    .toLocaleDateString(["en-AU"], {
      timeZone: "Australia/Perth",
    })
    .split("/")

  const isClosed = date[0] === "31" && date[1] === "12"

  return !isClosed
}
