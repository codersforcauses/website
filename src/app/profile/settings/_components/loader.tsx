import { Skeleton } from "~/components/ui/skeleton"
import { Separator } from "~/components/ui/separator"

const Loader = () => {
  return (
    <div className="h-full min-h-72 w-full space-y-4">
      <div className="space-y-1">
        <Skeleton className="h-7 w-5/12" />
        <Skeleton className="h-5 w-9/12" />
      </div>
      <Separator className="md:max-w-2xl" />
      <div className="space-y-1">
        <Skeleton className="min-h-12 w-full" />
      </div>
    </div>
  )
}

export default Loader
