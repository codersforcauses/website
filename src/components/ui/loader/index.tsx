"use client"

/**
 * Original code from https://dotmatrix.zzzzshawn.cloud/
 * Edited to reduce size to our requirements
 */

import * as React from "react"

import { DotMatrixBase, rowMajorIndex, type DotAnimationResolver, type DotMatrixCommonProps } from "./core"
import { useSteppedCycle } from "./hooks"

export type LoaderProps = Omit<DotMatrixCommonProps, "size" | "dotSize"> & {
  size?: "sm" | "default" | "lg"
}

/** Clockwise perimeter: one closed loop you can trace with your eye. */
const PERIMETER_PATH: readonly number[] = [
  rowMajorIndex(0, 0),
  rowMajorIndex(0, 1),
  rowMajorIndex(0, 2),
  rowMajorIndex(0, 3),
  rowMajorIndex(0, 4),
  rowMajorIndex(1, 4),
  rowMajorIndex(2, 4),
  rowMajorIndex(3, 4),
  rowMajorIndex(4, 4),
  rowMajorIndex(4, 3),
  rowMajorIndex(4, 2),
  rowMajorIndex(4, 1),
  rowMajorIndex(4, 0),
  rowMajorIndex(3, 0),
  rowMajorIndex(2, 0),
  rowMajorIndex(1, 0),
]

const LOOP_LEN = PERIMETER_PATH.length

const TAIL_BRIGHT = [1, 0.82, 0.64, 0.46, 0.3, 0.18] as const
const BACK_TAIL_BRIGHT = [0.38, 0.3, 0.22, 0.14] as const
const BASE_OPACITY = 0.08
const TWIST_INNER_OPACITY = 0.52
const SEAM_PULSE_OPACITY = 0.55

/** Corner steps on the loop → one cell “inside” the strip at the fold (half-twist cue). */
const TWIST_INNER_BY_HEAD_STEP: ReadonlyMap<number, number> = new Map([
  [0, rowMajorIndex(1, 1)],
  [4, rowMajorIndex(1, 3)],
  [8, rowMajorIndex(3, 3)],
  [12, rowMajorIndex(3, 1)],
])

function pathStepForCellIndex(cellIndex: number): number {
  const step = PERIMETER_PATH.indexOf(cellIndex)
  return step
}

function opacityFromTail(distance: number, tail: readonly number[]): number {
  if (distance < 0 || distance >= tail.length) {
    return 0
  }
  return tail[distance]!
}

export function Loader({
  speed = 1.45,
  opacityBase = 0.05,
  opacityMid = 0.75,
  opacityPeak = 1,
  size = "default",
  ...rest
}: LoaderProps) {
  const headStep = useSteppedCycle({
    active: true,
    cycleMsBase: 1600,
    steps: LOOP_LEN,
    speed,
  })

  let boxSize = 16
  let dotSize = 2

  if (size === "sm") {
    boxSize = 14
    dotSize = 2
  } else if (size === "lg") {
    boxSize = 24
    dotSize = 3
  }

  const resolver = React.useMemo<DotAnimationResolver>(() => {
    return (index) => {
      const onLoop = pathStepForCellIndex(index)
      const backHead = (headStep + Math.floor(LOOP_LEN / 2)) % LOOP_LEN

      let opacity = BASE_OPACITY

      if (onLoop >= 0) {
        const forward = (headStep - onLoop + LOOP_LEN) % LOOP_LEN
        const alongBack = (backHead - onLoop + LOOP_LEN) % LOOP_LEN
        opacity = Math.max(opacity, opacityFromTail(forward, TAIL_BRIGHT), opacityFromTail(alongBack, BACK_TAIL_BRIGHT))
      }

      const twistInner = TWIST_INNER_BY_HEAD_STEP.get(headStep)
      if (twistInner === index) {
        opacity = Math.max(opacity, TWIST_INNER_OPACITY)
      }

      const seam = rowMajorIndex(2, 2)
      if (index === seam && headStep % 4 === 0) {
        opacity = Math.max(opacity, SEAM_PULSE_OPACITY)
      }

      return { style: { opacity: Math.min(1, opacity) } }
    }
  }, [headStep])

  return (
    <DotMatrixBase
      {...rest}
      opacityBase={opacityBase}
      opacityMid={opacityMid}
      opacityPeak={opacityPeak}
      size={boxSize}
      dotSize={dotSize}
      speed={speed}
      animationResolver={resolver}
    />
  )
}
