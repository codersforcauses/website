export const PatternOrientation = {
  horizontal: "horizontal",
  vertical: "vertical",
  diagonal: "diagonal",
  diagonalRightToLeft: "diagonalRightToLeft",
} as const

export type PatternOrientationType = (typeof PatternOrientation)[keyof typeof PatternOrientation]

export type PatternLinesProps = {
  /** Unique id for the pattern. */
  id: string
  /** Width of the pattern element. */
  width: number
  /** Height of the pattern element. */
  height: number
  /** className applied to line path element. */
  className?: string
  /** Background color applied behind lines. */
  background?: string
  /** Stroke color applied to path elements. */
  stroke?: string
  /** strokeWidth applied to path elements. */
  strokeWidth?: number | string
  /** strokeDasharray applied to path elements. */
  strokeDasharray?: string | number
  /** strokeLinecap applied to path elements. */
  strokeLinecap?: "square" | "butt" | "round" | "inherit"
  /** shapeRendering applied to path elements. */
  shapeRendering?: string | number
  /** Array of orientations to render (can mix multiple). */
  orientation?: PatternOrientationType[]
}

export function pathForOrientation({ height, orientation }: { height: number; orientation: PatternOrientationType }) {
  switch (orientation) {
    case PatternOrientation.horizontal:
      return `M 0,${height / 2} l ${height},0`
    case PatternOrientation.diagonal:
      return `M 0,${height} l ${height},${-height} M ${-height / 4},${height / 4} l ${height / 2},${-height / 2}
             M ${(3 / 4) * height},${(5 / 4) * height} l ${height / 2},${-height / 2}`
    case PatternOrientation.diagonalRightToLeft:
      return `M 0,0 l ${height},${height}
        M ${-height / 4},${(3 / 4) * height} l ${height / 2},${height / 2}
        M ${(3 / 4) * height},${-height / 4} l ${height / 2},${height / 2}`
    case PatternOrientation.vertical:
    default:
      return `M ${height / 2}, 0 l 0, ${height}`
  }
}

export default function Pattern({
  id,
  width,
  height,
  strokeLinecap = "square",
  shapeRendering = "auto",
  orientation = ["vertical"],
  background,
  ...props
}: PatternLinesProps) {
  const orientations = Array.isArray(orientation) ? orientation : [orientation]

  return (
    <defs>
      <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
        {!!background && <rect width={width} height={height} fill={background} />}
        {orientations.map((o, i) => (
          <path
            key={`${id}-line-${o}-${i}`}
            d={pathForOrientation({ orientation: o, height })}
            strokeLinecap={strokeLinecap}
            shapeRendering={shapeRendering}
            {...props}
          />
        ))}
      </pattern>
    </defs>
  )
}
