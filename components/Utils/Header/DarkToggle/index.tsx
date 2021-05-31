import { useCallback, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const DarkToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const changeTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme]
  )

  return mounted ? (
    <button
      className='relative grid w-8 h-8 p-1 place-items-center text-secondary'
      onClick={changeTheme}
    >
      <span className='absolute transition-all duration-300 left-1 material-icons-sharp'>
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  ) : null
}

export default DarkToggle
