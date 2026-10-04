import * as React from "react"

import { MapContext } from "."

export function useMap() {
  const context = React.useContext(MapContext)
  if (!context) {
    return { map: null, isLoaded: false }
  }
  return context
}
