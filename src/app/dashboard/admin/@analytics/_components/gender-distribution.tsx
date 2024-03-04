"use client"

import * as React from "react"
import { Group, Responsive, Scale, Shape } from "@visx/visx"

interface DataProps {
  count: number
  pronouns: string
}

interface GenderDistributionProps {
  data: Array<DataProps>
}

interface GraphProps extends GenderDistributionProps {
  height: number
  width: number
}

const count = (d: DataProps) => d.count

const Graph = ({ width, height, data }: GraphProps) => {
  const radius = Math.min(width, height) / 2
  const centerY = height / 2
  const centerX = width / 2
  const donutThickness = 80

  const Gender = data.map((d) => d.pronouns)

  const getGenderColor = React.useMemo(
    () =>
      Scale.scaleOrdinal({
        domain: Gender,
        range: [
          "#3b82f6",
          "#ec4899",
          "rgba(255,255,255,0.5)",
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.3)",
          "rgba(255,255,255,0.2)",
          "rgba(255,255,255,0.1)",
        ],
      }),
    [],
  )

  return (
    <svg width={width} height={height}>
      <Group.Group top={centerY} left={centerX}>
        <Shape.Pie
          data={data}
          pieValue={count}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          padAngle={0.005}
        >
          {({ arcs, path }) => (
            <>
              {arcs.map((arc) => {
                const [centroidX, centroidY] = path.centroid(arc)
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

                return (
                  <g key={arc.index}>
                    <path
                      // compute interpolated path d attribute from intermediate angle values
                      d={path(arc) ?? ""}
                      fill={getGenderColor(arc.data.pronouns)}
                    />
                    {hasSpaceForLabel && (
                      <g>
                        <text
                          fill="white"
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          fontSize={9}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {arc.data.pronouns}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
            </>
          )}
        </Shape.Pie>
      </Group.Group>
    </svg>
  )
}

const GenderDistribution = (props: GenderDistributionProps) => {
  return (
    <Responsive.ParentSize>
      {({ width, height }) => <Graph {...props} width={width} height={height} />}
    </Responsive.ParentSize>
  )
}

export default GenderDistribution
