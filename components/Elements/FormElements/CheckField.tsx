import { InputHTMLAttributes, memo, ReactNode, useContext } from 'react'
import { RegisterOptions } from 'react-hook-form'
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
  const error: string = formState?.errors?.[props.name]?.message

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
          aria-describedby={`${props.name}-label`}
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
        <FieldLabel dark={dark} className='font-mono cursor-pointer'>
          {label}
        </FieldLabel>
        {error ? (
          <FieldMessage>{error}</FieldMessage>
        ) : (
          description && (
            <FieldMessage description dark={dark}>
              {description}
            </FieldMessage>
          )
        )}
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
