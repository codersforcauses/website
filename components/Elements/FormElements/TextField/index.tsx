import {
  InputHTMLAttributes,
  memo,
  useCallback,
  useContext,
  useState
} from 'react'
import { RegisterOptions } from 'react-hook-form'
import { FormContext } from 'lib/context/form'
import { FieldControl, FieldLabel, FieldMessage } from '../utils'

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
   * Validation rules
   */
  rules?: RegisterOptions
  /**
   * prefix text
   */
  prefix?: string
  /**
   * Add description or helper text to input
   */
  description?: string
}

const TextField = ({
  type = 'text',
  disabled = false,
  required = false,
  label,
  description,
  rules = {},
  noLabel,
  prefix,
  ...props
}: TextFieldProps) => {
  const [show, setShow] = useState(false)
  const handleClick = useCallback(() => {
    setShow(show => !show)
  }, [])

  const {
    dark,
    formState,
    disabled: formDisabled,
    register
  } = useContext(FormContext)
  const error: string = formState?.errors?.[props.name]?.message

  const number: Partial<{
    type: 'text'
    inputMode: 'decimal'
  }> = {}
  if (type === 'number') {
    number.type = 'text'
    number.inputMode = 'decimal'
  }
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
        <div
          className={[
            'flex items-center border',
            dark
              ? 'border-secondary text-secondary'
              : 'border-primary text-primary dark:border-secondary dark:text-secondary'
          ].join(' ')}
        >
          {prefix && <span className='text-opacity-75'>{prefix}</span>}
          <input
            {...props}
            aria-describedby={`${props.name}-label`}
            aria-invalid={!!error}
            id={props.name}
            type={type === 'password' && show ? 'text' : type}
            className={[
              'flex-grow bg-transparent border-0 focus:outline-none focus:ring-0',
              formDisabled || disabled ? 'pointer-events-none' : ''
            ]
              .join(' ')
              .trim()}
            disabled={formDisabled || disabled}
            {...register?.(props.name, rules)}
          />
          {error && (
            <span className='px-1 select-none material-icons-sharp text-danger'>
              error_outline
            </span>
          )}
          {type === 'password' && (
            <button
              type='button'
              disabled={formDisabled || disabled}
              className={[
                'h-full grid place-items-center py-1 px-2 hover:opacity-60 focus:outline-none focus:ring focus:ring-accent focus:ring-inset',
                formDisabled || disabled ? 'pointer-events-none' : ''
              ]
                .join(' ')
                .trim()}
              onClick={handleClick}
            >
              <span className='text-2xl text-current material-icons-sharp'>
                {show ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          )}
        </div>
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

export default memo(TextField)
