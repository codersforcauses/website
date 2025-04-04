"use client"

import * as Sentry from "@sentry/nextjs"
import * as React from "react"

import { Button } from "~/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className="container pb-12 pt-28 md:py-36">
      <h2>Something went wrong!</h2>
      <p>Cause: {error.message}</p>
      <p>Digest: {error.digest}</p>
      <Button className="mt-4" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  )
}
