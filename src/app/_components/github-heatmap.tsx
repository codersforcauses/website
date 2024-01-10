import * as React from "react"
import { scaleLinear } from "@visx/scale"
import { HeatmapRect } from "@visx/heatmap"
import ParentSize from "@visx/responsive/lib/components/ParentSize"

import getUserGithub from "./user-github"

type ContributionDays = {
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
  width: number
}

const GithubHeatmap = ({ data, width }: GithubHeatmapProps) => {
  if (!data?.weeks) return null

  const binWidth = width / data.weeks.length

  const days = (d: ContributionWeeks) => d.countributionDays
  const count = (d: ContributionDays) => d.contributionCount

  const xScale = scaleLinear<number>({
    range: [0, 7], // days of week
    domain: [0, 7],
  })
  const yScale = scaleLinear<number>({
    range: [0, data.weeks.length], // weeks of year
    domain: [0, data.weeks.length],
  })

  //   return null
  return (
    <svg width={width}>
      <rect x={0} y={0} width={width} fill="transparent">
        <HeatmapRect
          data={data.weeks}
          xScale={(d) => xScale(d) ?? 0}
          yScale={(d) => yScale(d) ?? 0}
          //   colorScale={rectColorScale}
          //   opacityScale={opacityScale}
          gap={2}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  width={bin.width}
                  height={bin.width}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  // fillOpacity={bin.opacity}
                  // onClick={() => {
                  //   const { row, column } = bin;
                  //   alert(JSON.stringify({ row, column, bin: bin.bin }));
                  // }}
                />
              )),
            )
          }
        </HeatmapRect>
      </rect>
    </svg>
  )
}

const GithubHeatmapWrapper = ({ username }: GithubHeatmapWrapperProps) => {
  console.log(username)

  const [data, setData] = React.useState()

  React.useEffect(() => {
    if (!username) return
    getUserGithub(username)
      .then((res) => {
        setData(res.data.user.contributionsCollection.contributionCalendar)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {
      setData(undefined)
    }
  }, [username])

  if (!data) return null

  return (
    <ParentSize>
      {(props) => <GithubHeatmap {...props} data={data} username={username} />}
    </ParentSize>
  )
}

export default GithubHeatmapWrapper
