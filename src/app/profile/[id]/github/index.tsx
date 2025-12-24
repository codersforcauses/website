"use client"

import * as React from "react"
import { Heatmap, Responsive, Scale } from "@visx/visx"
import { usePrefetchQuery, useSuspenseQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useTheme } from "next-themes"
import { siGithub } from "simple-icons"

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { getUserGithub, getUserGithubYears } from "./action"
import GithubProfileSkeleton from "./skeleton"

type GithubContributionLevels = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"

type ContributionTheme = Record<GithubContributionLevels, string>

interface ContributionDays {
  contributionLevel: GithubContributionLevels
  contributionCount: number
  date: string
  weekday: number
}

interface ContributionWeeks {
  contributionDays: ContributionDays[]
}

interface GithubHeatmapWrapperProps {
  username: string
}

interface GithubHeatmapProps extends GithubHeatmapWrapperProps {
  year: number
  width: number
}

const contributionText = (count: number) => {
  if (count === 0) return "No contributions"
  if (count === 1) return "1 contribution"
  return `${count} contributions`
}

const getWeeksForMonthsInYear = (weeks: ContributionWeeks[]) => {
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

export const DAYS_IN_WEEK = 7
export const RECT_GAP = 2 // gap between heatmap rectangles
export const DAY_WIDTH = 28 // width of day of the week label
export const MIN_RECT_WIDTH = 16
function GithubHeatmap({ width, username, year }: GithubHeatmapProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["contributions", username, String(year)],
    queryFn: ({ queryKey }) => getUserGithub(queryKey[1]!, queryKey[2]!),
    refetchInterval: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })
  const WEEKS_IN_YEAR = data.weeks.length
  const BIN_WIDTH = (width - (DAY_WIDTH + RECT_GAP * WEEKS_IN_YEAR)) / WEEKS_IN_YEAR
  const RECT_DIMENSIONS = BIN_WIDTH < MIN_RECT_WIDTH ? MIN_RECT_WIDTH : BIN_WIDTH
  const HEATMAP_HEIGHT = (DAYS_IN_WEEK + 2) * (RECT_DIMENSIONS + RECT_GAP) - RECT_GAP
  const HEATMAP_WIDTH = WEEKS_IN_YEAR * (RECT_DIMENSIONS + RECT_GAP) - RECT_GAP

  const days = (d: ContributionWeeks) => d.contributionDays
  const count = (d: ContributionDays) => d.contributionCount

  const xScale = Scale.scaleLinear<number>({
    range: [0, HEATMAP_WIDTH],
    domain: [0, WEEKS_IN_YEAR],
  })
  const yScale = Scale.scaleLinear<number>({
    range: [0, HEATMAP_HEIGHT],
    domain: [0, DAYS_IN_WEEK],
  })

  const firstDay = data.weeks[0]?.contributionDays[0]?.weekday ?? 0
  const weeksInMonth = getWeeksForMonthsInYear(data.weeks)

  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? darkTheme : lightTheme

  return (
    <>
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
            className="grid grid-flow-col select-none"
            style={{
              gap: RECT_GAP,
              width: HEATMAP_WIDTH,
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
            <TooltipProvider>
              <Heatmap.HeatmapRect
                data={data.weeks}
                xScale={(d) => xScale(d) ?? 0}
                yScale={(d) => yScale(d) ?? 0}
                bins={days}
                count={count}
                gap={RECT_GAP}
              >
                {(heatmap) =>
                  heatmap.map((heatmapBins) =>
                    heatmapBins.map(({ bin, ...val }) => (
                      <Tooltip key={`github-contrib-${val.row}-${val.column}`}>
                        <TooltipTrigger asChild>
                          <div
                            style={{
                              width: RECT_DIMENSIONS,
                              height: RECT_DIMENSIONS,
                              backgroundColor: `var(${theme[bin.contributionLevel]})`,
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="select-none">
                            {contributionText(bin.contributionCount)} on {format(new Date(bin.date), "MMM do")}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )),
                  )
                }
              </Heatmap.HeatmapRect>
            </TooltipProvider>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="grid-row-2 mt-2 grid items-center justify-between gap-2 text-sm @min-xs:flex">
        <p>
          {contributionText(data.totalContributions)} in {year}
        </p>
        <div aria-hidden className="flex font-mono text-xs select-none" style={{ gap: RECT_GAP }}>
          <span>Less</span>
          {Object.values(theme).map((color) => (
            <div
              key={color}
              style={{
                width: RECT_DIMENSIONS,
                height: RECT_DIMENSIONS,
                backgroundColor: `var(${color})`,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </>
  )
}

const currentYear = new Date().getFullYear().toString()
export default function GithubProfile({ username }: GithubHeatmapWrapperProps) {
  const [active, setActive] = React.useState(currentYear)

  const { data: years } = useSuspenseQuery({
    queryKey: ["contributions-years", username],
    queryFn: ({ queryKey }) => getUserGithubYears(queryKey[1]!),
    refetchInterval: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })
  usePrefetchQuery({
    queryKey: ["contributions", username, currentYear],
    queryFn: ({ queryKey }) => getUserGithub(queryKey[1]!, queryKey[2]!),
  })

  if (!years) return null

  return (
    <Responsive.ParentSize>
      {({ width }) => (
        <Tabs defaultValue={currentYear} value={active} onValueChange={setActive}>
          <ScrollArea style={{ width }}>
            <div className="mb-2.5 flex flex-nowrap items-center justify-between gap-x-2">
              <TabsList>
                {years.map((year) => (
                  <TabsTrigger key={year} value={`${year}`}>
                    {year}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {years.map((year) => (
            <TabsContent key={year} value={`${year}`} className="@container">
              <React.Suspense fallback={<GithubProfileSkeleton width={width} />}>
                <GithubHeatmap year={year} width={width} username={username} />
              </React.Suspense>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </Responsive.ParentSize>
  )
}
