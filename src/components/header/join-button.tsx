"use client"

import { track } from "@vercel/analytics/react"

import Link from "next/link"
import { Button } from "~/components/ui/button"

const JoinButton = () => (
  <Button
    asChild
    variant="secondary-dark"
    className="dark:hover:bg-primary dark:hover:text-black"
    onClick={() => {
      if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("join", { location: "header" })
    }}
  >
    <Link href="/join">Join us</Link>
  </Button>
)

export default JoinButton
