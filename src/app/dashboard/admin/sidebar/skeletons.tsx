import { Skeleton } from "~/ui/skeleton"

export function MeetingSkeleton() {
  return (
    <div className="grid w-full gap-1 *:h-8">
      <Skeleton variant="dark" />
      <Skeleton variant="dark" />
      <Skeleton variant="dark" />
    </div>
  )
}
