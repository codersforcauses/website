import { PropsWithChildren, ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  dark,
  disabled,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...props}
      className={[
        'px-4 py-2 relative text-lg focus:outline-none',
        disabled
          ? 'cursor-not-allowed'
          : dark
          ? 'text-secondary hover:bg-secondary hover:bg-opacity-50 hover:text-primary'
          : 'hover:bg-primary hover:bg-opacity-50 hover:text-secondary focus:ring focus:ring-accent dark:hover:bg-secondary dark:hover:text-primary dark:hover:bg-opacity-50',
        className
      ].join(' ')}
    >
      <span className='relative z-5'>{children}</span>
    </button>
  )
}

export default Button

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  dark?: boolean
}
