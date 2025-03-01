import Link from "next/link"

import { Button } from "~/components/ui/button"

// export const metadata: Metadata = {
//   title: "Not Found",
// }
// Metadata does not work on Not Found page
// https://github.com/vercel/next.js/issues/45620

export default function NotFound() {
  return (
    <main className="main container flex flex-col items-center justify-center gap-y-4">
      <title>Not Found | Coders for Causes</title>
      <div className="select-none text-6xl md:text-8xl">¯\_(ツ)_/¯</div>
      <h2 className="text-3xl font-bold">404: Not Found</h2>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  )
}
