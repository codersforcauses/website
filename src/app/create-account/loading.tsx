import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"

const currentYear = new Date().getFullYear()

export default function Loading() {
  return (
    <div className="container mx-auto grid gap-x-8 gap-y-4 px-4 py-12 md:grid-cols-2 md:gap-y-8 lg:gap-x-16">
      <Alert className="md:col-span-2">
        <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
        <AlertTitle>Email not found!</AlertTitle>
        <AlertDescription className="block">
          We couldn&apos;t find an account with that email address so you can create a new account here. If you think it
          was a mistake,{" "}
          <Button variant="link" className="h-auto p-0">
            <Link replace href="/join" className="inline outline-none select-none">
              click here to go back
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="leading-none font-semibold tracking-tight">Personal details</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Fields marked with * are required.</p>
        </div>
        {Array.from({ length: 10 })
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="grid gap-1.5">
              <Skeleton className="h-[14px] w-1/2" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
      </div>
      <div className="space-y-4 blur">
        <div className="space-y-2">
          <h2 className="leading-none font-semibold tracking-tight">Payment</h2>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <p>
              Become a paying member of Coders for Causes for just $5 a year (ends on 31st Dec {currentYear}). There are
              many benefits to becoming a member which include:
            </p>
            <ul className="list-inside list-disc">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>
        </div>
        {Array.from({ length: 6 })
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="space-1.5">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
      </div>
    </div>
  )
}
