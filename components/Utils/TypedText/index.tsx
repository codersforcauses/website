import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const TypedText = ({ text }: { text: Array<string> }) => {
  const typed = useRef<Typed>()
  const typedText = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    typed.current = new Typed(typedText.current!, {
      strings: text,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      cursorChar: '\u258C',
      loop: true
    })

    const tempType = typed.current

    return () => {
      tempType.destroy()
    }
  }, [text])

  return <span ref={typedText} data-cy='typer' />
}

export default TypedText
