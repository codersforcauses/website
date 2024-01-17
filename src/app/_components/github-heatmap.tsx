import * as React from "react"
import { scaleLinear } from "@visx/scale"
import { HeatmapRect } from "@visx/heatmap"
import ParentSize from "@visx/responsive/lib/components/ParentSize"
import { format } from "date-fns"
import { useTheme } from "next-themes"
import { siGithub } from "simple-icons"

import { getUserGithub, getUserGithubYears } from "./user-github"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

type GithubContributionLevels = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"

type ContributionTheme = Record<GithubContributionLevels, string>

type ContributionDays = {
  contributionLevel: GithubContributionLevels
  contributionCount: number
  date: string
  weekday: number
}

type ContributionWeeks = {
  contributionDays: Array<ContributionDays>
}

type Data = {
  totalContributions: number
  weeks: Array<ContributionWeeks>
}

interface GithubHeatmapWrapperProps {
  username: string
}

interface GithubHeatmapProps extends GithubHeatmapWrapperProps {
  data: Data
  year: number
  width: number
  theme: ContributionTheme
}

const contributionText = (count: number) => {
  if (count === 0) return "No contributions"
  if (count === 1) return "1 contribution"
  return `${count} contributions`
}

const getWeeksForMonthsInYear = (weeks: Array<ContributionWeeks>) => {
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

const DAYS_IN_WEEK = 7
const RECT_GAP = 2

const lightTheme: ContributionTheme = {
  NONE: "#e5e5e5",
  FIRST_QUARTILE: "#a3a3a3",
  SECOND_QUARTILE: "#525252",
  THIRD_QUARTILE: "#262626",
  FOURTH_QUARTILE: "#000000",
}
const darkTheme: ContributionTheme = {
  NONE: "#171717",
  FIRST_QUARTILE: "#404040",
  SECOND_QUARTILE: "#737373",
  THIRD_QUARTILE: "#d4d4d4",
  FOURTH_QUARTILE: "#ffffff",
}

const GithubHeatmap = ({ data, theme, width, year }: GithubHeatmapProps) => {
  const BIN_WIDTH = width / (data.weeks.length + 2)
  const RECT_DIMENSIONS = BIN_WIDTH < 14 ? 14 : BIN_WIDTH
  const WEEKS_IN_YEAR = data.weeks.length
  const HEATMAP_HEIGHT = (DAYS_IN_WEEK + 2) * (RECT_DIMENSIONS + RECT_GAP) - RECT_GAP
  const HEATMAP_WIDTH = (WEEKS_IN_YEAR + 2) * (RECT_DIMENSIONS + RECT_GAP) - RECT_GAP

  const days = (d: ContributionWeeks) => d.contributionDays
  const count = (d: ContributionDays) => d.contributionCount

  const xScale = scaleLinear<number>({
    range: [0, HEATMAP_WIDTH],
    domain: [0, data.weeks.length], // weeks of year
  })
  const yScale = scaleLinear<number>({
    range: [0, HEATMAP_HEIGHT],
    domain: [0, DAYS_IN_WEEK], // days of week
  })

  const firstDay = data.weeks[0]?.contributionDays[0]?.weekday ?? 0
  const weeksInMonth = getWeeksForMonthsInYear(data.weeks)

  return (
    <>
      <ScrollArea style={{ width }}>
        <div
          className="mb-3 grid select-none grid-flow-col"
          style={{
            width: HEATMAP_WIDTH,
            height: HEATMAP_HEIGHT,
            gap: RECT_GAP,
            gridTemplateColumns: `repeat(${WEEKS_IN_YEAR + 2}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${DAYS_IN_WEEK + 1}, minmax(0, 1fr))`,
          }}
        >
          <div
            className="col-span-full row-span-1 grid font-mono text-xs"
            style={{
              rowGap: RECT_GAP,
              gridTemplateColumns: `repeat(${WEEKS_IN_YEAR + 2}, minmax(0, 1fr))`,
            }}
          >
            <div className="col-span-2" />
            {Object.entries(weeksInMonth).map(([month, weeks]) => (
              <div key={month} className="self-end" style={{ gridColumn: `span ${weeks} / span ${weeks}` }}>
                {month}
              </div>
            ))}
          </div>
          <div
            className="col-span-2 row-span-7 grid grid-rows-7 font-mono"
            style={{
              columnGap: RECT_GAP,
            }}
          >
            <div className="row-span-2 self-end text-xs">Mon</div>
            <div className="row-span-2 self-end text-xs">Wed</div>
            <div className="row-span-2 self-end text-xs">Fri</div>
          </div>
          {firstDay !== 0 && (
            <div
              style={{
                gridRow: `span ${firstDay}/ span ${firstDay}`,
              }}
            />
          )}
          <TooltipProvider>
            <HeatmapRect
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
                            backgroundColor: theme[bin.contributionLevel],
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {contributionText(bin.contributionCount)} on {format(new Date(bin.date), "MMM do")}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )),
                )
              }
            </HeatmapRect>
          </TooltipProvider>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>
          {contributionText(data.totalContributions)} in {year}
        </span>
        <div className="flex select-none font-mono text-xs" style={{ gap: RECT_GAP }}>
          <span>Less</span>
          {Object.values(theme).map((color) => (
            <div
              key={color}
              style={{
                width: RECT_DIMENSIONS,
                height: RECT_DIMENSIONS,
                backgroundColor: color,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </>
  )
}

const GithubHeatmapWrapper = ({ username }: GithubHeatmapWrapperProps) => {
  const currentYear = new Date().getFullYear().toString()

  const { resolvedTheme } = useTheme()
  const [data, setData] = React.useState<Data>()
  const [years, setYears] = React.useState<Array<number>>([])
  const [active, setActive] = React.useState(currentYear)

  React.useEffect(() => {
    if (!username) return
    getUserGithubYears(username)
      .then((res) => {
        setYears(res.data.user.contributionsCollection.contributionYears)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {
      setYears([])
    }
  }, [username])

  React.useEffect(() => {
    if (!username || !active) return
    getUserGithub(username, active)
      .then((res) => {
        setData(res.data.user.contributionsCollection.contributionCalendar)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {
      setData(undefined)
    }
  }, [username, active])

  const handleTabChange = React.useCallback((value: string) => {
    setActive(value)
  }, [])

  if (!data?.weeks) return null

  const contributionTheme = resolvedTheme === "dark" ? darkTheme : lightTheme

  return (
    <ParentSize>
      {({ width }) => (
        <Tabs value={active} onValueChange={handleTabChange}>
          <div className="flex items-center gap-2 py-2">
            <svg role="img" viewBox="0 0 24 24" height={24} width={24} className="fill-current">
              <title>{siGithub.title}</title>
              <path d={siGithub.path} />
            </svg>
            <h3>{username}</h3>
          </div>
          <ScrollArea style={{ width }}>
            <TabsList className="mb-3">
              {years.map((year) => (
                <TabsTrigger key={year} value={`${year}`}>
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {years.map((year) => (
            <TabsContent key={year} value={`${year}`}>
              <GithubHeatmap data={data} year={year} width={width} username={username} theme={contributionTheme} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </ParentSize>
  )
}

export default GithubHeatmapWrapper
