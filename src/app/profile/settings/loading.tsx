import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-medium">Personal details</h2>
        <p className="text-sm text-muted-foreground">Update your personal details. All fields here are required.</p>
      </div>
      <Separator className="md:max-w-2xl" />
      <div className="max-w-xl space-y-4">
        {new Array(5).fill(0).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <Skeleton className="h-[1.125rem] w-3/12" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[0.875rem] w-11/12" />
          </div>
        ))}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default Loading
