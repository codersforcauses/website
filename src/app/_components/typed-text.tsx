"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

interface Props {
  text: Array<string>
}
const TypedText = (props: Props) => {
  const typed = useRef<Typed>()
  const typedText = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    typed.current = new Typed(typedText.current!, {
      strings: props.text,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      cursorChar: "\u258C",
      loop: true,
    })

    const tempType = typed.current
    return () => {
      tempType.destroy()
    }
  }, [props.text])

  return <span ref={typedText} data-cy="typer" />
}

export default TypedText
