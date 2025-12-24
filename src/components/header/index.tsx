"use client"

import * as React from "react"
import { useInView } from "motion/react"

import HeaderServer from "./header"

export default function Header() {
  const ref = React.useRef<HTMLElement>(null)
  const isInView = useInView(ref)

  return <HeaderServer ref={ref} inView={isInView} />
}
