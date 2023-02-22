import { createContext, PropsWithChildren, ReactNode, useMemo } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

const FieldControlContext = createContext<FieldControlProps>({
  disabled: false,
  error: '',
  name: '',
  required: false
})

const FieldControl = ({
  children,
  ...props
}: PropsWithChildren<FieldControlProps>) => {
  const value = useMemo(() => props, [props])
  return (
    <FieldControlContext.Provider value={value}>
      {children}
    </FieldControlContext.Provider>
  )
}

export { FieldControlContext, FieldControl }

interface FieldControlProps {
  disabled: boolean
  error?:
    | string
    | undefined
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
  name: string
  required?: boolean
  children?: ReactNode
}
