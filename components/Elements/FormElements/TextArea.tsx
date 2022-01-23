import { InputHTMLAttributes, memo, useContext } from 'react'
import { RegisterOptions, useWatch } from 'react-hook-form'
import { FormContext } from 'lib/context/form'
import { FieldControl, FieldLabel, FieldMessage } from './utils'

const TextArea = ({
  disabled = false,
  required = false,
  counter,
  label,
  description,
  rules = {},
  noLabel,
  className,
  ...props
}: TextAreaProps) => {
  const {
    dark,
    formState,
    disabled: formDisabled,
    register
  } = useContext(FormContext)
  const error: string = formState?.errors?.[props.name]?.message

  const text: string = useWatch({ name: props.name })

  const length = text.length

  return (
    <FieldControl
      name={props.name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || disabled}
    >
      <div
        className={[
          'flex flex-col w-full space-y-1 relative',
          formDisabled || disabled ? 'cursor-not-allowed' : ''
        ]
          .join(' ')
          .trim()}
      >
        <FieldLabel dark={dark} noLabel={noLabel} className='font-mono'>
          {label}
        </FieldLabel>
        <div className='relative'>
          <textarea
            {...props}
            aria-describedby={`${props.name}-label`}
            aria-invalid={!!error}
            id={props.name}
            className={[
              'w-full bg-transparent border resize-y textarea focus:outline-none focus:ring-0 focus:border-current',
              dark
                ? 'border-secondary text-secondary'
                : 'border-primary text-primary dark:border-secondary dark:text-secondary',
              error ? 'pr-8' : '',
              className
            ]
              .join(' ')
              .trim()}
            {...register?.(props.name, rules)}
          />
          {counter && (
            <span className='absolute text-xs select-none opacity-80 bottom-1 right-1'>
              {typeof counter === 'number' ? `${length}/${counter}` : length}
            </span>
          )}
        </div>
        {error && (
          <span className='absolute select-none top-9 right-1.5 material-icons-sharp text-danger'>
            error_outline
          </span>
        )}
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

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label for input
   */
  label: string
  /**
   * Name for input
   */
  name: string
  /**
   * Counter for input
   */
  counter?: number | boolean
  /**
   * Display label or make it sr-only
   */
  noLabel?: boolean
  /**
   * Validation rules
   */
  rules?: RegisterOptions
  /**
   * Add description or helper text to input
   */
  description?: string
}

export default memo(TextArea)
