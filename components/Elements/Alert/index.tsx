import { PropsWithChildren } from 'react'

const Alert = ({ color = 'info', ...props }: PropsWithChildren<AlertProps>) => {
  let alertClass: string, icon: string
  if (color === 'success') {
    alertClass = 'bg-success border-success'
    icon = 'check_circle'
  } else if (color === 'warning') {
    alertClass = 'bg-warning border-warning'
    icon = 'warning'
  } else if (color === 'danger') {
    alertClass = 'bg-danger border-danger'
    icon = 'error'
  } else {
    alertClass = 'bg-accent border-accent'
    icon = 'info'
  }

  return (
    <div
      role='alert'
      className={[
        alertClass,
        'bg-opacity-50 border px-4 py-2 flex items-center dark:bg-opacity-25',
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
