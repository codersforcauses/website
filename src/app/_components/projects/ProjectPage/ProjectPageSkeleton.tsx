import { Skeleton } from "~/components/ui/skeleton"

const ProjectPageSkeleton = () => {
  return (
    <>
      <div className="relative bg-black py-32 md:py-48">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="bg-secondary py-12 text-black dark:bg-alt-dark dark:text-white">
        <div className="container flex flex-row">
          <div className="relative mx-auto w-full px-3">
            <nav className="mb-4">
              <Skeleton className="h-4 w-1/5" />
            </nav>
            <div className="space-y-8 lg:mr-8">
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4 md:h-12" />
                <div className="grid grid-cols-2 items-center font-mono lg:hidden">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4 sm:max-w-max lg:hidden">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="hidden w-full max-w-xs space-y-8 md:block">
              <div className="space-y-4 font-mono">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="grid gap-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
          <div className="flex w-1/3 flex-col space-y-4 pt-8">
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectPageSkeleton
