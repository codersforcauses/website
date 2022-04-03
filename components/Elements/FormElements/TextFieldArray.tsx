import { InputHTMLAttributes, memo, useContext, useEffect } from 'react'
import { RegisterOptions, useFieldArray } from 'react-hook-form'
import { FormContext } from './utils/form'
import { FieldControl, FieldLabel, FieldMessage } from './utils'

const TextField = ({
  type = 'text',
  disabled = false,
  required = false,
  label,
  description,
  rules = {},
  noLabel,
  setFocused,
  ...props
}: TextFieldProps) => {
  const {
    control,
    dark,
    formState,
    disabled: formDisabled,
    register,
    setFocus
  } = useContext(FormContext)
  const error: string = formState?.errors?.[props.name]?.message

  useEffect(() => {
    setFocused && setFocus?.(props.name)
  }, [setFocus, props.name, setFocused])

  const { fields, append, remove } = useFieldArray({
    name: props.name,
    control
  })

  return (
    <FieldControl
      name={props.name}
      error={error}
      required={'required' in rules || required}
      disabled={formDisabled || disabled}
    >
      <div
        className={[
          'flex flex-col w-full space-y-1',
          formDisabled || disabled ? 'cursor-not-allowed opacity-75' : ''
        ]
          .join(' ')
          .trim()}
      >
        <FieldLabel dark={dark} noLabel={noLabel} className='font-mono'>
          {label}
        </FieldLabel>
        <div className='flex flex-col space-y-2'>
          {fields.map((field, i) => (
            <div
              key={field.id}
              className={['flex items-center gap-2'].join(' ')}
            >
              <input
                {...props}
                aria-describedby={
                  error
                    ? `${props.name}-error`
                    : description
                    ? `${props.name}-description`
                    : undefined
                }
                aria-invalid={!!error}
                id={`${props.name}.${i}`}
                type={type}
                className={[
                  'w-full bg-transparent border focus:outline-none focus:ring-0 focus:border-current',
                  dark
                    ? 'border-secondary text-secondary'
                    : 'border-primary text-primary dark:border-secondary dark:text-secondary',
                  formDisabled || disabled ? 'pointer-events-none' : '',
                  error ? 'animate-wiggle' : ''
                ]
                  .join(' ')
                  .trim()}
                disabled={formDisabled || disabled}
                {...register?.(`${props.name}.${i}.value`, rules)}
              />
              {error && (
                <span className='px-1 select-none material-icons-sharp text-danger'>
                  error_outline
                </span>
              )}
              <button
                type='button'
                className='flex p-2 border'
                onClick={() => append({ value: '' })}
              >
                <span className='material-icons-sharp'>add</span>
              </button>
            </div>
          ))}
        </div>
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
    </FieldControl>
  )
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input
   */
  label: string
  /**
   * Name for input
   */
  name: string
  /**
   * Display label or make it sr-only
   */
  noLabel?: boolean
  /**
   * Sets input to focus
   */
  setFocused?: boolean
  /**
   * Validation rules
   */
  rules?: RegisterOptions
  /**
   * Add description or helper text to input
   */
  description?: string
}

export default memo(TextField)
