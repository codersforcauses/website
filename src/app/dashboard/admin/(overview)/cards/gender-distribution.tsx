"use client"

import * as React from "react"
import { arc, descending, pie, scaleOrdinal, schemeGreys } from "d3"
import { useSuspenseQuery } from "@tanstack/react-query"
import { motion, type Variants } from "motion/react"

import { useApi } from "~/trpc/react"
import { useDimensions } from "~/hooks/use-dimensions"
import type { PatternOrientationType } from "~/components/svg/pattern"

interface DataProps {
  count: number
  pronouns: string
}

interface GraphProps {
  height: number
  width: number
  data: DataProps[]
}

interface PiePattern {
  orientation: PatternOrientationType[]
  strokeWidth: number
}

const draw: Variants = {
  hidden: {
    pathLength: 1,
  },
  visible: {
    pathLength: 0,
    transition: {
      pathLength: {
        type: "spring",
        duration: 2,
        bounce: 0,
      },
    },
  },
}

// TODO: need a controlled random function for custom gender patterns
function getPattern(pronoun: string, key?: string): PiePattern {
  switch (pronoun) {
    case "he/him":
      return {
        strokeWidth: 6, // solid fill
        orientation: ["horizontal"],
      }
    case "she/her":
      return {
        strokeWidth: 1,
        orientation: ["diagonalRightToLeft", "diagonal"],
      }
    case "they/them":
      return {
        strokeWidth: 3,
        orientation: ["horizontal", "vertical"],
      }
    default:
      return {
        strokeWidth: 1,
        orientation: ["diagonal"],
      }
  }
}

function Graph({ width, height, data }: GraphProps) {
  const total = data.reduce((acc, cu) => acc + cu.count, 0)
  const outerRadius = Math.min(width, height) / 2
  const innerRadius = outerRadius / 1.4
  const centerY = height / 2
  const centerX = width / 2

  const pieData = React.useMemo(() => {
    const pieGenerator = pie<any, DataProps>()
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180))
      .value((d) => d.count)
    return pieGenerator(data)
  }, [data])

  const colorScale = scaleOrdinal(schemeGreys[data.length])

  const arcs = React.useMemo(() => {
    const arcPathGenerator = arc()
    return pieData.map((p) =>
      arcPathGenerator({
        outerRadius,
        innerRadius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
        padAngle: 0.004,
      }),
    )
  }, [innerRadius, outerRadius, pieData])

  return (
    <motion.svg width={width} height={height} initial="hidden" animate="visible" className="inline-block">
      <g transform={`translate(${centerX}, ${centerY})`}>
        {arcs.map((arc, i) => {
          const pronoun = data[i]!.pronouns
          // const patternProps = getPattern(pronoun)
          // console.log(colorScale(pronoun))

          return (
            <g key={i}>
              {/* <Pattern id={pronoun} height={6} width={6} {...patternProps} className="stroke-current" /> */}
              <path
                d={arc!}
                fill={colorScale(pronoun)}
                //  fill={`url(#${pronoun})`}
              />
            </g>
          )
        })}
      </g>
      <defs>
        <clipPath id="cut-off">
          <rect x="0" y="0" width={width} height={centerY} />
        </clipPath>
      </defs>
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        strokeWidth={(outerRadius - innerRadius) * 2}
        clipPath="url(#cut-off)"
        className="translate-x-full -scale-x-100 stroke-muted"
        variants={draw}
      />
      <circle cx={centerX} cy={centerY} r={innerRadius} className="fill-background" />
      {data.map(({ count, pronouns }, i) => (
        <g key={pronouns} transform={`translate(0, ${centerY + 30 + i * 24 + i * 4})`} className="fill-current">
          {/* <rect fill={`url(#${pronouns})`} width={24} height={24} /> */}
          <text textAnchor="start" alignmentBaseline="baseline" dx={30} dy={16}>
            {pronouns.toLowerCase()}
          </text>
          <g transform={`translate(${width}, 0)`}>
            <text dy={16} textAnchor="end" alignmentBaseline="baseline" className="tabular-nums">
              {count}
              <tspan className="fill-muted-foreground">{" | "}</tspan>
              {((count / total) * 100).toPrecision(2)}%
            </text>
          </g>
        </g>
      ))}
    </motion.svg>
  )
}

export default function GenderDistribution() {
  const { admin } = useApi()
  const { ref, dimensions } = useDimensions()

  const { data: gender } = useSuspenseQuery(
    admin.analytics.getGenderStatistics.queryOptions(undefined, {
      staleTime: Infinity,
      refetchOnMount: "always",
    }),
  )

  return (
    <div ref={ref} className="size-full min-h-0 min-w-0">
      <Graph data={gender.toSorted((a, b) => descending(a.count, b.count))} {...dimensions} />
    </div>
  )
}
