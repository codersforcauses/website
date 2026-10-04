"use client"

import type { ContributionCalendarWeek, ContributionLevel } from "@octokit/graphql-schema"
import { format } from "date-fns"
import { useTheme } from "next-themes"

import { useDimensions } from "~/hooks/use-dimensions"
// import { ScrollArea, ScrollBar } from "~/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import GithubProfileSkeleton from "./skeleton"

interface GithubHeatmapProps {
  isLoading: boolean
  data: ContributionCalendarWeek[]
  children?: React.ReactNode
}

type ContributionTheme = Record<ContributionLevel, string>

const getWeeksForMonthsInYear = (weeks: ContributionCalendarWeek[]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const data: Record<string, number> = {}
  weeks
    .map((week) => {
      const firstDay = week.contributionDays[0]!.date
      const getMonthFromWeek = months[new Date(firstDay).getMonth()]!
      return getMonthFromWeek
    })
    .forEach((month) => {
      data[month] = (data[month] ?? 0) + 1
    })

  return data
}

const lightTheme: ContributionTheme = {
  NONE: "--color-neutral-200",
  FIRST_QUARTILE: "--color-neutral-400",
  SECOND_QUARTILE: "--color-neutral-600",
  THIRD_QUARTILE: "--color-neutral-800",
  FOURTH_QUARTILE: "--color-black",
}
const darkTheme: ContributionTheme = {
  NONE: "--color-neutral-900",
  FIRST_QUARTILE: "--color-neutral-700",
  SECOND_QUARTILE: "--color-neutral-500",
  THIRD_QUARTILE: "--color-neutral-300",
  FOURTH_QUARTILE: "--color-white",
}

export function contributionText(count: number) {
  if (count === 0) return "No contributions"
  if (count === 1) return "1 contribution"
  return `${count} contributions`
}

export const DAYS_IN_WEEK = 7
export const RECT_GAP = 2 // gap between heatmap rectangles
export const DAY_WIDTH = 28 // width of day of the week label
export const MIN_RECT_WIDTH = 16

export default function GithubHeatmap({ isLoading, data, children }: GithubHeatmapProps) {
  const { ref, dimensions } = useDimensions()
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? darkTheme : lightTheme

  const firstDay = data[0]?.contributionDays[0]?.weekday ?? 0
  const weeksInMonth = getWeeksForMonthsInYear(data)

  const WEEKS_IN_YEAR = data.length
  const BIN_WIDTH = (dimensions.width - (DAY_WIDTH + RECT_GAP * WEEKS_IN_YEAR)) / WEEKS_IN_YEAR
  const RECT_DIMENSIONS = BIN_WIDTH < MIN_RECT_WIDTH ? MIN_RECT_WIDTH : BIN_WIDTH

  if (isLoading) return <GithubProfileSkeleton />

  return (
    <>
      <div
        ref={ref}
        className="@container flex flex-1 flex-nowrap select-none"
        style={{
          gap: RECT_GAP,
        }}
      >
        <div
          className="sticky left-0 grid w-fit grid-rows-8 font-mono text-xs"
          style={{
            gap: RECT_GAP,
          }}
        >
          <div style={{ height: RECT_DIMENSIONS }} />
          <div style={{ height: RECT_DIMENSIONS }} />
          <div className="flex items-center" style={{ height: RECT_DIMENSIONS }}>
            <span>Mon</span>
          </div>
          <div style={{ height: RECT_DIMENSIONS }} />
          <div className="flex items-center" style={{ height: RECT_DIMENSIONS }}>
            <span>Wed</span>
          </div>
          <div style={{ height: RECT_DIMENSIONS }} />
          <div className="flex items-center" style={{ height: RECT_DIMENSIONS }}>
            <span>Fri</span>
          </div>
          <div style={{ height: RECT_DIMENSIONS }} />
        </div>
        <div
          className="ml-auto grid grid-flow-col"
          style={{
            gap: RECT_GAP,
            gridTemplateColumns: `repeat(${WEEKS_IN_YEAR}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${DAYS_IN_WEEK + 1}, minmax(0, 1fr))`,
          }}
        >
          <div
            className="col-span-full row-span-1 grid font-mono text-xs"
            style={{
              columnGap: RECT_GAP,
              gridTemplateColumns: `repeat(${WEEKS_IN_YEAR}, minmax(0, 1fr))`,
            }}
          >
            {Object.entries(weeksInMonth).map(([month, weeks]) => (
              <div key={month} style={{ gridColumn: `span ${weeks} / span ${weeks}` }}>
                <p>{month}</p>
              </div>
            ))}
          </div>
          {firstDay !== 0 && (
            <div
              style={{
                gridRow: `span ${firstDay}/ span ${firstDay}`,
              }}
            />
          )}
          {data.map(({ contributionDays }, row) =>
            contributionDays.map(({ contributionCount, contributionLevel, date }, col) => (
              <Tooltip key={`github-contrib-${row}-${col}`}>
                <TooltipTrigger
                  render={
                    <span
                      style={{
                        width: RECT_DIMENSIONS,
                        height: RECT_DIMENSIONS,
                        backgroundColor: `var(${theme[contributionLevel]})`,
                      }}
                    />
                  }
                />
                <TooltipContent className="select-none">
                  {contributionText(contributionCount)} on {format(new Date(date), "MMM do")}
                </TooltipContent>
              </Tooltip>
            )),
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div aria-hidden className="flex h-fit font-mono text-xs select-none" style={{ gap: RECT_GAP }}>
          <span className="pr-1">Less</span>
          {Object.values(theme).map((color) => (
            <span
              key={color}
              suppressHydrationWarning
              className="size-4"
              style={{
                backgroundColor: `var(${color})`,
              }}
            />
          ))}
          <span className="pl-1">More</span>
        </div>
        {children}
      </div>
    </>
  )
}
