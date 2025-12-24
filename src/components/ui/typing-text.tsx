"use client"

import * as React from "react"
import { motion, type Variants } from "motion/react"

import { cn } from "~/lib/utils"

interface TypewriterProps {
  /**
   * HTML Tag to render the component as
   * @default div
   */
  as?: React.ElementType

  /**
   * Speed of typing in milliseconds
   * @default 50
   */
  speed?: number

  /**
   * Initial delay before typing starts
   * @default 0
   */
  initialDelay?: number

  /**
   * Time to wait between typing and deleting
   * @default 2000
   */
  waitTime?: number

  /**
   * Speed of deleting characters
   * @default 30
   */
  deleteSpeed?: number

  /**
   * Whether to loop through texts array
   * @default true
   */
  loop?: boolean
  text: string | string[]
  className?: string
  showCursor?: boolean
  hideCursorOnType?: boolean
  cursorChar?: string | React.ReactNode

  /**
   * Animation variants for cursor
   */
  cursorAnimationVariants?: {
    initial: Variants["initial"]
    animate: Variants["animate"]
  }
  cursorClassName?: string
}

export function TypingText({
  text,
  as: Tag = "span",
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "▌",
  cursorClassName = "ml-1",
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: "reverse",
      },
    },
  },
  ...props
}: TypewriterProps & React.HTMLAttributes<HTMLElement>) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0)

  const texts = React.useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    const currentText = texts[currentTextIndex]

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          if (currentTextIndex === texts.length - 1 && !loop) {
            return
          }
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          setCurrentIndex(0)
          timeout = setTimeout(() => {
            return
          }, waitTime)
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1))
          }, deleteSpeed)
        }
      } else {
        if (currentIndex < currentText!.length) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentText![currentIndex])
            setCurrentIndex((prev) => prev + 1)
          }, speed)
        } else if (texts.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true)
          }, waitTime)
        }
      }
    }

    // Apply initial delay only at the start
    if (currentIndex === 0 && !isDeleting && displayText === "") {
      timeout = setTimeout(startTyping, initialDelay)
    } else {
      startTyping()
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, displayText, isDeleting, speed, deleteSpeed, waitTime, texts, currentTextIndex, loop, initialDelay])

  return (
    <Tag className={cn("inline tracking-tight whitespace-pre-wrap", className)} {...props}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          variants={cursorAnimationVariants}
          className={cn(
            cursorClassName,
            hideCursorOnType && (currentIndex < texts[currentTextIndex]!.length || isDeleting) ? "hidden" : "",
          )}
          initial="initial"
          animate="animate"
        >
          {cursorChar}
        </motion.span>
      )}
    </Tag>
  )
}
