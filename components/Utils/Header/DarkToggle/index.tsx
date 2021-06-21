import { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const DarkToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme: theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const changeTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [setTheme, theme]
  )

  return mounted ? (
    <button
      className='relative grid w-10 h-10 place-items-center text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
      onClick={changeTheme}
    >
      <span className='absolute left-0 p-2 transition-all duration-300 material-icons-sharp'>
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  ) : null
}

export default DarkToggle
