import { PropsWithChildren } from 'react'

const Alert = ({ color = 'info', ...props }: PropsWithChildren<AlertProps>) => {
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
    icon = 'info'
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

export default Alert

interface AlertProps {
  color?: 'success' | 'danger' | 'warning' | 'info'
  icon?: boolean
  className?: string
}
