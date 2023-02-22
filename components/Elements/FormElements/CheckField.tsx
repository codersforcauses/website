import { InputHTMLAttributes, memo, ReactNode, useContext } from 'react'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  RegisterOptions
} from 'react-hook-form'
import { FormContext } from './utils/form'
import { FieldControl, FieldLabel, FieldMessage } from './utils'

const CheckFieldProps = ({
  disabled = false,
  required = false,
  label,
  description,
  rules = {},
  className,
  ...props
}: CheckFieldProps) => {
  const {
    dark,
    formState,
    disabled: formDisabled,
    register
  } = useContext(FormContext)
  const error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined = formState?.errors?.[props.name]?.message

  return (
    <FieldControl
      name={props.name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || disabled}
    >
      <div
        className={[
          'inline-flex items-center w-max space-x-1.5',
          formDisabled || disabled ? 'cursor-not-allowed' : ''
        ]
          .join(' ')
          .trim()}
      >
        <input
          {...props}
          type='checkbox'
          aria-describedby={
            error
              ? `${props.name}-error`
              : description
              ? `${props.name}-description`
              : undefined
          }
          aria-invalid={!!error}
          id={props.name}
          className={[
            'h-5 w-5 text-primary bg-transparent border border-primary cursor-pointer dark:border-secondary focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-transparent',
            formDisabled || disabled ? 'pointer-events-none' : '',
            error ? 'text-danger' : '',
            className
          ]
            .join(' ')
            .trim()}
          {...register?.(props.name, rules)}
        />
        <div className='flex flex-col'>
          <FieldLabel dark={dark} className='font-mono cursor-pointer'>
            {label}
          </FieldLabel>
          {error ? (
            <FieldMessage id={`${props.name}-error`}>{error}</FieldMessage>
          ) : (
            description && (
              <FieldMessage
                description
                dark={dark}
                id={`${props.name}-description`}
              >
                {description}
              </FieldMessage>
            )
          )}
        </div>
      </div>
    </FieldControl>
  )
}

interface CheckFieldProps
  extends InputHTMLAttributes<Omit<HTMLInputElement, 'type'>> {
  /**
   * Label for input
   */
  label: string | ReactNode
  /**
   * Name for input
   */
  name: string
  /**
   * Validation rules
   */
  rules?: RegisterOptions
  /**
   * Add description or helper text to input
   */
  description?: string
}

export default memo(CheckFieldProps)
