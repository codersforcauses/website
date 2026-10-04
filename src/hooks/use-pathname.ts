"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

export function usePathName() {
  const pathname = usePathname()
  const [clientPathname, setClientPathname] = React.useState("")

  React.useEffect(() => {
    setClientPathname(pathname)
  }, [pathname])

  return clientPathname
}
