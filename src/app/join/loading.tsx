import { Alert, AlertDescription, AlertTitle } from "~/ui/alert"
import { Button } from "~/ui/button"
import { Skeleton } from "~/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid gap-y-4">
      <Alert>
        <span aria-hidden className="material-symbols-sharp">
          info
        </span>
        <AlertTitle>Welcome!</AlertTitle>
        <AlertDescription>
          No passwords here! Enter your email, and we&apos;ll email you a code to sign in or bring you to the sign up
          page.
        </AlertDescription>
      </Alert>
      <div className="grid gap-1.5">
        <Skeleton className="h-[14px] w-1/2" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Button disabled>Loading</Button>
    </div>
  )
}
