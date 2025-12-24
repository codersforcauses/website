"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "~/components/ui/button"

export function toggleTheme(theme: string | undefined, setTheme: React.Dispatch<React.SetStateAction<string>>) {
  const styleId = "theme-transition-styles"
  const isDark = theme === "dark"
  const animation = `
      ::view-transition-old(root) {
        animation: none;
      }
      ::view-transition-new(root) {
        animation: 0.8s var(--ease-out-cubic) wipe-in-bottom-left forwards;
      }
      @keyframes wipe-in-bottom-left {
        from {
          clip-path: polygon(50% -50%, 150% 50%, 150% 50%, 50% -50%);
        }
        to {
          clip-path: polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%);
        }
      }
    `
  let styleElement = document.getElementById(styleId) as HTMLStyleElement

  if (!styleElement) {
    styleElement = document.createElement("style")
    styleElement.id = styleId
    document.head.appendChild(styleElement)
  }

  styleElement.textContent = animation

  const switchTheme = () => {
    if (isDark) setTheme("light")
    else setTheme("dark")
  }

  if (!document.startViewTransition) switchTheme()
  else document.startViewTransition(switchTheme)
}

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggle = React.useCallback(() => {
    toggleTheme(resolvedTheme, setTheme)
  }, [resolvedTheme, setTheme])

  return (
    <Button variant="ghost-dark" size="icon" className="bg-black focus-visible:ring-white/25" onClick={toggle}>
      <span className="material-symbols-sharp">{isDark ? "dark_mode" : "light_mode"}</span>
    </Button>
  )
}
