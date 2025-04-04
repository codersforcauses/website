"use client"

import { track } from "@vercel/analytics/react"
import Link from "next/link"

import { Button } from "~/components/ui/button"

const JoinUs = () => (
  <Button
    asChild
    variant="dark"
    size="lg"
    className="sm:text-lg"
    onClick={() => {
      if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") track("join", { location: "home page" })
    }}
  >
    <Link href="/join">Join us</Link>
  </Button>
)

export default JoinUs
