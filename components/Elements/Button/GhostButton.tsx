import { PropsWithChildren, ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  dark,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    {...props}
    className={[
      'px-4 py-2 relative focus:outline-none',
      dark
        ? 'text-secondary hover:bg-secondary/10'
        : 'hover:bg-primary/10 dark:hover:bg-secondary/10',
      props.disabled
        ? 'cursor-not-allowed opacity-75'
        : 'focus:ring focus:ring-accent focus:ring-inset',
      className
    ].join(' ')}
  >
    {/* <span className='relative z-[5]'> */}
    {children}
    {/* </span> */}
  </button>
)

export default Button

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // loading?: boolean
  dark?: boolean
}
