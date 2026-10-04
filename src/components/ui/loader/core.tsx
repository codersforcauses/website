"use client"

import { cn } from "~/lib/utils"

export interface DotMatrixCommonProps {
  size?: number
  dotSize?: number
  speed?: number
  ariaLabel?: string
  className?: string
  dotClassName?: string
  opacityBase?: number
  opacityMid?: number
  opacityPeak?: number
}

export type DotAnimationResolver = (index: number) => {
  className?: string
  style?: React.CSSProperties
}

interface DotMatrixBaseProps extends DotMatrixCommonProps {
  animationResolver?: DotAnimationResolver
}

const MATRIX_SIZE = 5
const CENTER = Math.floor(MATRIX_SIZE / 2)
const MAX_RADIUS = Math.hypot(CENTER, CENTER)

export function rowMajorIndex(row: number, col: number): number {
  return row * MATRIX_SIZE + col
}

function indexToCoord(index: number): { row: number; col: number } {
  return {
    row: Math.floor(index / MATRIX_SIZE),
    col: index % MATRIX_SIZE,
  }
}

function distanceFromCenter(index: number): number {
  const { row, col } = indexToCoord(index)
  return Math.hypot(row - CENTER, col - CENTER)
}

function polarAngle(index: number): number {
  const { row, col } = indexToCoord(index)
  return Math.atan2(row - CENTER, col - CENTER)
}

function normalizedRadius(index: number): number {
  const { row, col } = indexToCoord(index)
  return Math.hypot(row - CENTER, col - CENTER) / MAX_RADIUS
}

function manhattanDistance(index: number): number {
  const { row, col } = indexToCoord(index)
  return Math.abs(row - CENTER) + Math.abs(col - CENTER)
}

const SOURCE_BASE_OPACITY = 0.08
const SOURCE_MID_OPACITY = 0.34
const SOURCE_PEAK_OPACITY = 0.94

function lerpDmx(start: number, end: number, progress: number): number {
  return start + (end - start) * progress
}

function normalizeProgressDmx(value: number, start: number, end: number): number {
  const span = end - start
  if (Math.abs(span) < Number.EPSILON) {
    return 0
  }
  return Math.min(1, Math.max(0, (value - start) / span))
}

function coerceOpacityDmx(value: number | undefined): number | undefined {
  if (value == null || !Number.isFinite(value)) {
    return undefined
  }
  return Math.min(1, Math.max(0, value))
}

function remapOpacityToTriplet(
  opacity: number,
  opacityBase: number | undefined,
  opacityMid: number | undefined,
  opacityPeak: number | undefined,
): number {
  if (!Number.isFinite(opacity)) {
    return opacity
  }

  const hasOverrides = Boolean(opacityBase || opacityMid || opacityPeak)
  const safeOpacity = Math.min(1, Math.max(0, opacity))
  if (!hasOverrides) {
    return safeOpacity
  }

  const targetBase = coerceOpacityDmx(opacityBase) ?? SOURCE_BASE_OPACITY
  const targetMid = coerceOpacityDmx(opacityMid) ?? SOURCE_MID_OPACITY
  const targetPeak = coerceOpacityDmx(opacityPeak) ?? SOURCE_PEAK_OPACITY

  if (safeOpacity <= SOURCE_BASE_OPACITY) {
    const progress = normalizeProgressDmx(safeOpacity, 0, SOURCE_BASE_OPACITY)
    return Math.min(1, Math.max(0, lerpDmx(0, targetBase, progress)))
  }

  if (safeOpacity <= SOURCE_MID_OPACITY) {
    const progress = normalizeProgressDmx(safeOpacity, SOURCE_BASE_OPACITY, SOURCE_MID_OPACITY)
    return Math.min(1, Math.max(0, lerpDmx(targetBase, targetMid, progress)))
  }

  if (safeOpacity <= SOURCE_PEAK_OPACITY) {
    const progress = normalizeProgressDmx(safeOpacity, SOURCE_MID_OPACITY, SOURCE_PEAK_OPACITY)
    return Math.min(1, Math.max(0, lerpDmx(targetMid, targetPeak, progress)))
  }

  const progress = normalizeProgressDmx(safeOpacity, SOURCE_PEAK_OPACITY, 1)
  return Math.min(1, Math.max(0, lerpDmx(targetPeak, 1, progress)))
}

function getMatrix5Layout(size: number, dotSize: number): { gap: number; matrixSpan: number } {
  const n = MATRIX_SIZE
  const g = Math.max(1, Math.floor((size - dotSize * n) / (n - 1)))
  return { gap: g, matrixSpan: size }
}

function clamp01Dmx(n: number | undefined) {
  if (n == null || !Number.isFinite(n)) {
    return
  }
  return Math.min(1, Math.max(0, n))
}

export function DotMatrixBase({
  size = 24,
  dotSize = 3,
  speed = 1,
  ariaLabel = "loading",
  className,
  dotClassName,
  animationResolver,
  opacityBase,
  opacityMid,
  opacityPeak,
}: DotMatrixBaseProps) {
  const safeSpeed = speed > 0 ? speed : 1
  const speedScale = 1 / safeSpeed
  const { gap, matrixSpan } = getMatrix5Layout(size, dotSize)
  const center = Math.floor(MATRIX_SIZE / 2)
  const ob = clamp01Dmx(opacityBase) ?? 0.16
  const om = clamp01Dmx(opacityMid) ?? 0.32
  const op = clamp01Dmx(opacityPeak) ?? 1
  const unit = dotSize + gap

  const dmxVarStyle = {
    width: matrixSpan,
    height: matrixSpan,
    "--dmx-cycle": "1500ms",
    "--dmx-speed": speedScale,
    ["--dmx-dot-size" as const]: `${dotSize}px`,
    ["--dmx-opacity-base" as const]: ob,
    ["--dmx-opacity-mid" as const]: om,
    ["--dmx-opacity-peak" as const]: op,
  } as unknown as React.CSSProperties

  const dots = Array.from({ length: MATRIX_SIZE * MATRIX_SIZE }).map((_, index) => {
    const { row, col } = indexToCoord(index)
    const distance = distanceFromCenter(index)
    const angle = polarAngle(index)
    const radiusNormalizedValue = normalizedRadius(index)
    const manhattan = manhattanDistance(index)
    const deltaX = (col - center) * unit
    const deltaY = (row - center) * unit

    const animationState = animationResolver?.(index) ?? {}

    const resolvedAnimationStyle = animationState.style ? { ...animationState.style } : undefined
    let stylePatch: React.CSSProperties | undefined = resolvedAnimationStyle

    const rawOpacity = stylePatch?.opacity
    if (stylePatch != null && typeof rawOpacity === "number") {
      const remappedOpacity = remapOpacityToTriplet(rawOpacity, ob, om, op)
      stylePatch = { ...stylePatch, opacity: remappedOpacity }
    }

    const dotStyle = {
      width: dotSize,
      height: dotSize,
      "--dmx-distance": distance,
      "--dmx-row": row,
      "--dmx-col": col,
      "--dmx-x": `${deltaX}px`,
      "--dmx-y": `${deltaY}px`,
      "--dmx-angle": angle,
      "--dmx-radius": radiusNormalizedValue,
      "--dmx-manhattan": manhattan,
      ...stylePatch,
    } as React.CSSProperties

    return (
      <span
        key={index}
        aria-hidden="true"
        className={cn(
          "block bg-current opacity-[calc(0.5*(var(--dmx-opacity-base)+var(--dmx-opacity-mid)))] will-change-[opacity]",
          dotClassName,
          animationState.className,
        )}
        style={dotStyle}
      />
    )
  })

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center align-middle", className)}
      style={dmxVarStyle}
    >
      <div className="grid grid-cols-5 grid-rows-5" style={{ gap }}>
        {dots}
      </div>
    </div>
  )
}
