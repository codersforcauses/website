import * as React from "react"

export function useDimensions() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

  const ref = React.useCallback((node: HTMLDivElement) => {
    if (!node) return
    const resizeObserver = new ResizeObserver(() => {
      const rect = node.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height,
      })
    })
    resizeObserver.observe(node)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return { ref, dimensions }
}
