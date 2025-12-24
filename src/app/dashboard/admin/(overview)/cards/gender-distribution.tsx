"use client"

import * as React from "react"
import { Group, Responsive, Shape, Pattern, Legend, Scale } from "@visx/visx"
import { motion } from "motion/react"

import { api } from "~/trpc/react"
import { cn } from "~/lib/utils"

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
  // isFocused: Record<string, boolean>
  // onHoverEnter: (label: string) => void
  // onHoverLeave: () => void
}

interface PiePattern {
  CustomPattern: typeof Pattern.PatternLines | typeof Pattern.PatternHexagons
  orientation: React.ComponentPropsWithoutRef<typeof Pattern.PatternLines>["orientation"]
  strokeWidth: number
}

const count = (d: DataProps) => d.count

// TODO: need a controlled random function for custom gender patterns
function getPattern(pronoun: string, key?: string): PiePattern {
  switch (pronoun) {
    case "he/him":
      return {
        CustomPattern: Pattern.PatternLines,
        strokeWidth: 6, // solid fill
        orientation: ["horizontal"],
      }
    case "she/her":
      return {
        CustomPattern: Pattern.PatternLines,
        strokeWidth: 2,
        orientation: ["diagonalRightToLeft", "diagonal"],
      }
    case "they/them":
      return {
        CustomPattern: Pattern.PatternLines,
        strokeWidth: 3,
        orientation: ["horizontal", "vertical"],
      }
    default:
      return {
        CustomPattern: Pattern.PatternLines,
        strokeWidth: 2,
        orientation: ["diagonalRightToLeft"],
      }
  }
}

// TODO: add hover to highlight
function Graph({
  width,
  height,
  data,
  // isFocused, onHoverEnter, onHoverLeave
}: GraphProps) {
  const radius = Math.min(width, height) / 2
  const centerY = height / 2
  const centerX = width / 2

  return (
    <motion.svg width={width} height={height} className="group/paths">
      <Group.Group top={centerY} left={centerX}>
        <Shape.Pie data={data} pieValue={count} outerRadius={radius} innerRadius={radius / 1.25} padAngle={0.01}>
          {({ arcs, path }) =>
            arcs.map((arc, i) => {
              const id = arc.data.pronouns
              const { CustomPattern, ...patternProps } = getPattern(arc.data.pronouns)
              return (
                <g key={id}>
                  <CustomPattern
                    id={id}
                    height={6}
                    width={6}
                    className="stroke-neutral-950 dark:stroke-neutral-50"
                    {...patternProps}
                  />
                  <motion.path
                    d={path(arc) ?? ""}
                    fill={`url(#${id})`}
                    data-pattern={id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.15 * i,
                      duration: 0.3,
                    }}
                    className="transition-opacity duration-200 ease-in-out group-has-[:hover]/paths:not-hover:opacity-40"
                    // className={isFocused[arc.data.pronouns] ? "opacity-100" : "opacity-50"}
                    // onHoverStart={() => onHoverEnter(arc.data.pronouns)}
                    // onHoverEnd={onHoverLeave}
                  />
                </g>
              )
            })
          }
        </Shape.Pie>
      </Group.Group>
    </motion.svg>
  )
}
// TODO: find a solution using group and has to reduce js if possible
export default function GenderDistribution() {
  const [gender] = api.admin.analytics.getGenderStatistics.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    refetchOnMount: "always",
  })
  const pronouns = gender.map((g) => g.pronouns)
  // const [focusDefault] = React.useState({
  //   allTrue: pronouns.reduce(
  //     (obj, p) => ({
  //       ...obj,
  //       [p]: true,
  //     }),
  //     {} as Record<string, boolean>,
  //   ),
  //   allFalse: pronouns.reduce(
  //     (obj, p) => ({
  //       ...obj,
  //       [p]: false,
  //     }),
  //     {} as Record<string, boolean>,
  //   ),
  // })
  // const [focusPronoun, setFocusPronoun] = React.useState(
  //   pronouns.reduce(
  //     (obj, p) => ({
  //       ...obj,
  //       [p]: true,
  //     }),
  //     {} as Record<string, boolean>,
  //   ),
  // )

  const threshold = Scale.scaleOrdinal({
    domain: pronouns,
    range: pronouns.map((p) => getPattern(p)),
  })

  // const onHoverEnter = React.useCallback(
  //   (label: string) => {
  //     setFocusPronoun({
  //       ...focusDefault.allFalse,
  //       [label]: true,
  //     })
  //   },
  //   [focusDefault.allFalse],
  // )
  // const onHoverLeave = React.useCallback(() => {
  //   setFocusPronoun(focusDefault.allTrue)
  // }, [focusDefault.allTrue])

  return (
    <div className="grid gap-6 @xs/gender:grid-cols-7">
      <Responsive.ParentSize className="aspect-square w-full @xs/gender:col-span-4">
        {({ width, height }) => (
          <Graph
            data={gender}
            width={width}
            height={height}
            // isFocused={focusPronoun}
            // onHoverEnter={onHoverEnter}
            // onHoverLeave={onHoverLeave}
          />
        )}
      </Responsive.ParentSize>
      <Legend.LegendOrdinal scale={threshold}>
        {(labels) => (
          <div className="group/legend @xs/gender:col-span-3 @xs/gender:place-self-center">
            {labels.map((label) => {
              const id = label.text
              const { CustomPattern, ...patternProps } = label.value!
              return (
                <Legend.LegendItem
                  key={`legend-${id}`}
                  data-pattern={id}
                  className={cn(
                    "flex items-center gap-1.5 pt-1 first:pt-0",
                    "transition-opacity duration-200 ease-in-out group-has-[:hover]/legend:not-hover:opacity-40",
                    // focusPronoun[id] ? "opacity-100" : "opacity-50"
                  )}
                  // onMouseOver={() => onHoverEnter(id)}
                  // onMouseLeave={onHoverLeave}
                >
                  <svg width={24} height={24}>
                    <CustomPattern
                      id={id}
                      height={6}
                      width={6}
                      className="stroke-neutral-950 dark:stroke-neutral-50"
                      {...patternProps}
                    />
                    <rect fill={`url(#${id})`} width={24} height={24} />
                  </svg>
                  <p className="font-medium">{id}</p>
                  <span className="font-mono text-neutral-500 dark:text-neutral-400">
                    {gender.find((g) => g.pronouns === id)?.count}
                  </span>
                </Legend.LegendItem>
              )
            })}
          </div>
        )}
      </Legend.LegendOrdinal>
    </div>
  )
}
