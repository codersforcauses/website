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
    ? 'text-secondary/75 text-sm'
    : 'text-primary/75 text-sm dark:text-secondary/75'

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
