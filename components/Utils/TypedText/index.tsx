import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default ({ text }: { text: Array<string> }) => {
  let typed: Typed
  const typedText: any = useRef<HTMLSpanElement>()

  useEffect(() => {
    typed = new Typed(typedText.current, {
      strings: text,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      cursorChar: '\u258B',
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return <span ref={typedText} />
}
