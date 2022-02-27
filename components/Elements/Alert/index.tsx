import { PropsWithChildren } from 'react'
import { ColorProps } from '@lib/types'

const Alert = ({
  color = 'accent',
  ...props
}: PropsWithChildren<AlertProps>) => {
  let alertClass: string, icon: string
  if (color === 'success') {
    alertClass = 'bg-success/50 dark:bg-success/25 border-success'
    icon = 'check_circle'
  } else if (color === 'warning') {
    alertClass = 'bg-warning/50 dark:bg-warning/25 border-warning'
    icon = 'warning'
  } else if (color === 'danger') {
    alertClass = 'bg-danger/50 dark:bg-danger/25 border-danger'
    icon = 'error'
  } else {
    alertClass = 'bg-accent/50 dark:bg-accent/25 border-accent'
    icon = 'accent'
  }

  return (
    <div
      role='alert'
      className={[
        alertClass,
        'border px-4 py-2 flex items-center',
        props.className
      ]
        .join(' ')
        .trim()}
    >
      {props.icon && (
        <span className='mr-3 select-none material-icons-sharp'>{icon}</span>
      )}
      {props.children}
    </div>
  )
}
interface AlertProps {
  color?: ColorProps
  icon?: boolean
  className?: string
}

export default Alert
