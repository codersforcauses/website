import { PropsWithChildren, useContext } from 'react'
import { FieldControlContext } from './FieldControl'

const FieldMessage = ({
  dark,
  children,
  description,
  className = '',
  ...props
}: PropsWithChildren<FieldMessageProps>) => {
  const { error } = useContext(FieldControlContext)
  const errorClass = 'text-sm text-danger'
  const messageClass = dark
    ? 'text-secondary text-sm text-opacity-75'
    : 'text-primary text-sm text-opacity-75 dark:text-secondary'

  return (
    <span
      {...props}
      className={[error && !description ? errorClass : messageClass, className]
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  )
}

export default FieldMessage

interface FieldMessageProps {
  className?: string
  dark?: boolean
  description?: boolean
  id: string
}
