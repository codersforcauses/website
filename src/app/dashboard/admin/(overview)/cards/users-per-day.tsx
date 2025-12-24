"use client"

import * as React from "react"
import { Axis, Group, Responsive, Pattern, Scale, Shape } from "@visx/visx"
import { subMonths } from "date-fns"
import { motion } from "motion/react"

import { ToggleGroup, ToggleGroupItem } from "~/ui/toggle-group"
import { api } from "~/trpc/react"

type GraphRange = "0" | "1" | "3" | "6" | "12"

interface DataProps {
  date: string
  nonMembers: number
  members: number
}

interface UsersPerDayProps {
  data: Array<DataProps>
}

interface GraphProps extends UsersPerDayProps {
  range: GraphRange
  height: number
  width: number
}

const currentDate = new Date()
const dateStart = new Date("2024-02-21")

function Graph({ data, range, height, width }: GraphProps) {
  const keys = ["members", "nonMembers"]
  const relativeMonths = range === "0" ? dateStart : subMonths(currentDate, Number(range))
  // scales
  const xScale = Scale.scaleUtc({
    domain: [relativeMonths, currentDate],
    range: [0, width],
    nice: true,
  })
  const yScale = Scale.scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.members + d.nonMembers))],
    range: [height, 0],
  })
  const colorScale = Scale.scaleOrdinal<string, string>({
    domain: keys,
    range: ["#333333", "#aaaaaa"],
  })

  return (
    <svg height={height} width={width}>
      <Group.Group left={24}>
        <Axis.AxisLeft hideZero scale={yScale} />
        <Axis.AxisBottom hideZero scale={xScale} top={height} />
      </Group.Group>
      <Group.Group left={80}>
        <Shape.BarStack
          data={data}
          keys={keys}
          xScale={xScale}
          yScale={yScale}
          color={colorScale}
          x={(d: DataProps) => new Date(d.date)}
        >
          {(barStacks) =>
            barStacks.map((barStack) =>
              barStack.bars.map((bar) => (
                <rect
                  key={`${bar.key}-${bar.index}`}
                  x={bar.x}
                  y={bar.y}
                  height={bar.height}
                  width={width / data.length}
                  fill={bar.color}
                />
              )),
            )
          }
        </Shape.BarStack>
      </Group.Group>
    </svg>
  )
}

export default function UsersPerDay() {
  const [range, setRange] = React.useState<GraphRange>("1")
  const [data] = api.admin.analytics.getUsersPerDay.useSuspenseQuery(Number(range), {
    staleTime: Infinity,
    refetchOnMount: "always",
  })

  return (
    <>
      <div className="flex flex-wrap items-center justify-between pt-0.5">
        <h3 className="font-mono text-sm font-medium tracking-tight">Sign-ups</h3>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          className="[&>button]:size-8"
          value={range}
          onValueChange={(value) => {
            if (!value) setRange("0")
            else setRange(value as GraphRange)
          }}
        >
          <ToggleGroupItem value="1">
            <span className="w-4 text-xs">1M</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="3">
            <span className="w-4 text-xs">3M</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="6">
            <span className="w-4 text-xs">6M</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="12">
            <span className="w-4 text-xs">1Y</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Responsive.ParentSize>
        {({ width, height }) => <Graph data={data} range={range} width={width} height={height} />}
      </Responsive.ParentSize>
    </>
  )
}
