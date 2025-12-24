import { Skeleton } from "~/ui/skeleton"
import { ScrollArea } from "~/ui/scroll-area"
import { DAY_WIDTH, DAYS_IN_WEEK, MIN_RECT_WIDTH, RECT_GAP } from "."

interface GithubProfileSkeletonProps {
  width: number
}

export default function GithubProfileSkeleton({ width }: GithubProfileSkeletonProps) {
  const WEEKS_IN_YEAR = 53
  const BIN_WIDTH = (width - (DAY_WIDTH + RECT_GAP * WEEKS_IN_YEAR)) / WEEKS_IN_YEAR
  const RECT_DIMENSIONS = BIN_WIDTH < MIN_RECT_WIDTH ? MIN_RECT_WIDTH : BIN_WIDTH
  const HEATMAP_WIDTH = WEEKS_IN_YEAR * (RECT_DIMENSIONS + RECT_GAP) - RECT_GAP

  return (
    <div className="flex flex-col gap-y-2">
      <ScrollArea aria-hidden style={{ minWidth: width }}>
        <div className="mb-2.5 flex flex-nowrap justify-between">
          <div
            className="sticky left-0 grid grid-rows-8 bg-white pr-1.5 font-mono text-xs dark:bg-neutral-950"
            style={{
              rowGap: RECT_GAP,
            }}
          >
            <div style={{ height: RECT_DIMENSIONS }} />
            <div style={{ height: RECT_DIMENSIONS }} />
            <div className="" style={{ height: RECT_DIMENSIONS }}>
              <p>Mon</p>
            </div>
            <div style={{ height: RECT_DIMENSIONS }} />
            <div className="" style={{ height: RECT_DIMENSIONS }}>
              <p>Wed</p>
            </div>
            <div style={{ height: RECT_DIMENSIONS }} />
            <div className="" style={{ height: RECT_DIMENSIONS }}>
              <p>Fri</p>
            </div>
            <div style={{ height: RECT_DIMENSIONS }} />
          </div>
          <div
            className="grid grid-flow-col grid-rows-8"
            style={{
              gap: RECT_GAP,
              width: HEATMAP_WIDTH,
              gridTemplateColumns: `repeat(${WEEKS_IN_YEAR}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${DAYS_IN_WEEK + 1}, minmax(0, 1fr))`,
            }}
          >
            <div className="col-span-full row-span-1 grid font-mono text-xs">
              <Skeleton
                className="w-full"
                style={{
                  height: RECT_DIMENSIONS,
                }}
              />
            </div>
            {Array.from({ length: WEEKS_IN_YEAR * DAYS_IN_WEEK }).map((_, index) => (
              <Skeleton
                key={index}
                style={{
                  width: RECT_DIMENSIONS,
                  height: RECT_DIMENSIONS,
                }}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
      <Skeleton className="h-5 w-full" />
    </div>
  )
}
