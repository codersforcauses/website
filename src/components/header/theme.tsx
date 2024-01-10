"use client"

import { useTheme } from "next-themes"
import { useCallback } from "react"

import { Button } from "~/components/ui/button"

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const switchTheme = useCallback(() => {
    isDark ? setTheme("light") : setTheme("dark")
  }, [isDark, setTheme])

  return (
    <Button variant="ghost-dark" size="icon" onClick={switchTheme}>
      <span className="material-symbols-sharp">
        {isDark ? "dark_mode" : "light_mode"}
      </span>
    </Button>
  )
}

export default ThemeSwitcher
