import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
