"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Curve, XYChart } from "@visx/visx"
import { format } from "date-fns"

interface DataProps {
  date: Date
  users: number
  members: number
}

interface UsersPerDayProps {
  data: Array<DataProps>
}

interface GraphProps extends UsersPerDayProps {
  theme: string
}

type CountKey = "users" | "members"

const dateScaleConfig = { type: "band", paddingInner: 0 } as const
const countScaleConfig = { type: "linear" } as const
const config = {
  x: dateScaleConfig,
  y: countScaleConfig,
}

const getDate = (d: DataProps) => d.date
const getUserCount = (d: DataProps) => d.users
const getMemberCount = (d: DataProps) => d.members
const accessors = {
  x: {
    users: getDate,
    members: getDate,
  },
  y: {
    users: getUserCount,
    members: getMemberCount,
  },
  date: getDate,
}

const Graph = ({ theme, data }: GraphProps) => {
  const lightTheme = XYChart.buildChartTheme({
    backgroundColor: "#ffffff",
    colors: ["#404040", "#0070f3"],
    gridColor: "#00000050",
    gridColorDark: "#ffffff50",
    tickLength: 2,
  })

  const darkTheme = XYChart.buildChartTheme({
    backgroundColor: "#0a0a0a",
    colors: ["#d4d4d4", "#0070f3"],
    gridColor: "#ffffff50",
    gridColorDark: "#00000050",
    tickLength: 2,
  })

  return (
    <XYChart.XYChart
      theme={theme === "dark" ? darkTheme : lightTheme}
      xScale={config.x}
      yScale={config.y}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <XYChart.LineSeries
        dataKey="users"
        data={data}
        xAccessor={accessors.x.users}
        yAccessor={accessors.y.users}
        curve={Curve.curveLinear}
      />
      <XYChart.LineSeries
        dataKey="members"
        data={data}
        xAccessor={accessors.x.members}
        yAccessor={accessors.y.members}
        curve={Curve.curveLinear}
      />
      <XYChart.Tooltip<DataProps>
        unstyled
        applyPositionStyle
        showVerticalCrosshair
        snapTooltipToDatumX
        showDatumGlyph
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div className="bg-muted p-2 text-sm">
            {/** date */}
            <p className="mb-2 text-xs">
              {(tooltipData?.nearestDatum?.datum && format(accessors.date(tooltipData?.nearestDatum.datum), "PPP")) ??
                "No date"}
            </p>
            {/** count */}
            {(Object.keys(tooltipData?.datumByKey ?? {}).filter((countKey) => countKey) as Array<CountKey>).map(
              (countKey) => {
                const countOnDay =
                  tooltipData?.nearestDatum?.datum && accessors.y[countKey](tooltipData?.nearestDatum?.datum)

                return (
                  <p key={countKey}>
                    <span
                      style={{
                        color: colorScale?.(countKey),
                      }}
                    >
                      {countKey}
                    </span>
                    {": "}
                    {countOnDay ?? 0}
                  </p>
                )
              },
            )}
          </div>
        )}
      />
    </XYChart.XYChart>
  )
}

const UsersPerDay = (props: UsersPerDayProps) => {
  const { resolvedTheme: theme } = useTheme()

  return <Graph {...props} theme={theme ?? "light"} />
}

export default UsersPerDay
