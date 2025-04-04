"use client"

import * as Sentry from "@sentry/nextjs"
import * as React from "react"

import { Button } from "~/components/ui/button"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body className="grid h-full w-full place-items-center">
        <div>
          <h2>Something went wrong!</h2>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  )
}
