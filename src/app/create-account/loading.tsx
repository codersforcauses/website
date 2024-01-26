import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="container grid h-screen gap-x-8 gap-y-4 py-8 md:grid-cols-2 md:gap-y-8 lg:gap-x-16">
      <Alert className="md:col-span-2">
        <span className="material-symbols-sharp size-4 text-xl leading-4">mail</span>
        <AlertTitle>Email not found!</AlertTitle>
        <AlertDescription>
          We couldn&apos;t find an account with that email address so you can create a new account here. If you think it
          was a mistake,{" "}
          <Button variant="link" className="h-auto p-0">
            <Link replace href="/join">
              click here to go back
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold leading-none tracking-tight">Personal details</h2>
          <p className="text-sm text-muted-foreground">All fields here are required.</p>
        </div>
        {new Array(10).fill(0).map((_, idx) => (
          <div key={idx} className="space-1.5">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="space-y-4 blur">
        <div className="space-y-2">
          <h2 className="font-semibold leading-none tracking-tight">Payment</h2>
          <div className="text-sm text-muted-foreground">
            <p>
              Become a paying member of Coders for Causes for just $5 a year (ends on 31st Dec{" "}
              {new Date().getFullYear()}). There are many benefits to becoming a member which include:
            </p>
            <ul className="list-inside list-disc">
              <li>discounts to paid events such as industry nights</li>
              <li>the ability to vote and run for committee positions</li>
              <li>the ability to join our projects run during the winter and summer breaks.</li>
            </ul>
          </div>
        </div>
        {new Array(6).fill(0).map((_, idx) => (
          <div key={idx} className="space-1.5">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading
