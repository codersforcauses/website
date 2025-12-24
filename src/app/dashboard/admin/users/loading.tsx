import { Skeleton } from "~/ui/skeleton"

export default function Loading() {
  return (
    <div className="relative flex flex-1 flex-col p-4 pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 md:flex-row-reverse md:flex-nowrap">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-9 w-full sm:max-w-xs md:max-w-sm" />
      </div>
      <div className="h-full max-h-[calc(100svh-(var(--header-height)+5.5rem+1rem))] overflow-hidden bg-white md:max-h-[calc(100svh-(var(--header-height)+2.75rem+1rem))] dark:bg-neutral-950">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex h-14 w-full items-center justify-between border-b border-neutral-50 p-2 dark:border-neutral-900"
          >
            <div className="grid gap-0.5">
              <Skeleton className="h-5 w-7" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-5 w-9" />
            <div />
            <Skeleton className="h-4 w-20" />
            <div className="grid gap-px">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="grid gap-px">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div />
          </div>
        ))}
      </div>
    </div>
  )
}
