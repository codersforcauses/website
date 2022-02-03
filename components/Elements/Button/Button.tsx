import {
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  ButtonHTMLAttributes
} from 'react'

const Button = ({
  children,
  color,
  className,
  dark,
  disabled,
  fill,
  loading,
  type,
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
      }, count * 20)
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

  let colorClass: string

  switch (color) {
    case 'success':
      colorClass = 'bg-success border-success text-secondary'
      break
    case 'warning':
      colorClass = 'bg-warn border-warn text-primary'
      break
    case 'danger':
      colorClass = 'bg-danger border-danger text-secondary'
      break
    case 'accent':
      colorClass = 'bg-accent border-accent text-primary'
      break
    default:
      colorClass = ''
      break
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        'px-4 py-2 relative text-lg border border-primary dark:border-secondary focus:outline-none focus:ring focus:ring-accent focus:ring-inset',
        dark
          ? 'border-secondary text-secondary'
          : 'border-primary text-primary dark:border-secondary dark:text-secondary',
        fill
          ? 'bg-primary text-secondary hover:bg-primary/75 dark:bg-transparent'
          : undefined,
        disabled || loading
          ? 'cursor-not-allowed opacity-75'
          : 'hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:hover:text-primary',
        color ? colorClass : '',
        loading ? 'cursor-wait' : '',
        className
      ]
        .join(' ')
        .trim()}
    >
      <span className='relative z-[5]'>{children}</span>
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
  color?: 'success' | 'warning' | 'danger' | 'accent'
  dark?: boolean
  fill?: boolean
  loading?: boolean
}
