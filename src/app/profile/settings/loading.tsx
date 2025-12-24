import { Separator } from "~/ui/separator"
import { Skeleton } from "~/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Membership</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          View your current membership details or renew your membership.
        </p>
      </div>
      <Separator className="md:max-w-2xl" />
      <Skeleton className="h-full w-1/2" />
    </div>
  )
}
