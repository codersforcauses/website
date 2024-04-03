"use client"

import * as React from "react"
import { Group, Responsive, Shape, Tooltip } from "@visx/visx"

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

const getColor = (pronoun: string) => {
  switch (pronoun) {
    case "he/him":
      return "#3b82f6"
    case "she/her":
      return "#ec4899"
    case "they/them":
      return "#10b981"
    default:
      return "#f59e0b"
  }
}

const Graph = ({ width, height, data }: GraphProps) => {
  const tooltip = Tooltip.useTooltip<DataProps>()
  const radius = Math.min(width, height) / 2
  const centerY = height / 2
  const centerX = width / 2

  return (
    <div>
      <svg width={width} height={height}>
        <Group.Group top={centerY} left={centerX}>
          <Shape.Pie data={data} pieValue={count} outerRadius={radius} innerRadius={radius / 2} padAngle={0.005}>
            {({ arcs, path }) =>
              arcs.map((arc) => {
                const [centroidX, centroidY] = path.centroid(arc)
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

                return (
                  <g
                    key={arc.index}
                    onMouseLeave={() => {
                      tooltip.hideTooltip()
                    }}
                    onMouseMove={(event) => {
                      tooltip.showTooltip({
                        tooltipLeft: event.clientX,
                        tooltipTop: event.clientY,
                        tooltipData: arc.data,
                      })
                    }}
                  >
                    <path d={path(arc) ?? ""} fill={getColor(arc.data.pronouns)} />
                    {hasSpaceForLabel && (
                      <g>
                        <text
                          fill="white"
                          x={centroidX}
                          y={centroidY}
                          dy=".33rem"
                          fontSize={12}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {arc.data.pronouns}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })
            }
          </Shape.Pie>
        </Group.Group>
      </svg>
      {tooltip.tooltipOpen && tooltip.tooltipData && (
        <Tooltip.Tooltip
          unstyled
          applyPositionStyle
          top={tooltip.tooltipTop}
          left={tooltip.tooltipLeft}
          className="border border-black/25 bg-background p-2 text-sm text-primary dark:border-white/25"
        >
          {tooltip.tooltipData.pronouns}: {tooltip.tooltipData.count}
        </Tooltip.Tooltip>
      )}
    </div>
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
