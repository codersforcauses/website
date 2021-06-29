import { useEffect, useRef, useState } from 'react'
import { PropsWithChildren, ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  type,
  disabled,
  loading,
  className,
  dark,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)
  const [count, forceUpdate] = useState(0)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    if (loading) {
      timerRef.current = setTimeout(() => {
        forceUpdate(count + 1)
      }, count * 50)
      setFinished(false)
      setProgress(prev => (prev < 90 ? prev + Math.random() * count : prev))
    } else if (finished) {
      setProgress(0)
    } else {
      setProgress(100)
      setFinished(true)
    }

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [count, finished, loading])

  return (
    <button
      {...props}
      className={[
        'px-4 py-2 relative text-lg border border-primary dark:border-secondary',
        dark
          ? 'border-secondary text-secondary'
          : 'border-primary text-primary dark:border-secondary dark:text-secondary',
        disabled
          ? 'cursor-not-allowed'
          : 'hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:hover:text-primary',
        className
      ]
        .join(' ')
        .trim()}
    >
      <span className='relative z-5'>{children}</span>
      {loading && (
        <progress
          value={progress}
          max='100'
          className='absolute top-0 left-0 w-full h-full bg-transparent animate-pulse progress'
        />
      )}
    </button>
  )
}

export default Button

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dark?: boolean
  loading?: boolean
}
