"use client"

import { track } from "@vercel/analytics/react"
import Link from "next/link"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/ui/button"

export default function JoinUs() {
  return (
    <Link
      href="/join"
      className={cn(buttonVariants({ variant: "dark", size: "lg" }), "sm:text-lg")}
      onNavigate={() => {
        if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("join", { location: "home page" })
      }}
    >
      Join us
    </Link>
  )
}
