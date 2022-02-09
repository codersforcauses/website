import { InputHTMLAttributes, useCallback, useContext } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { RadioGroup as Radio } from '@headlessui/react'
import { FormContext } from './utils/form'
import { FieldControl, FieldLabel, FieldMessage } from './utils'

const RadioGroup = ({
  disabled = false,
  required = false,
  horizontal = false,
  label,
  description,
  options,
  rules = {},
  className,
  ...props
}: RadioGroupProps) => {
  const {
    formState,
    disabled: formDisabled,
    register
  } = useContext(FormContext)
  const error: string = formState?.errors?.[props.name]?.message

  const { setValue, watch } = useFormContext()
  const selected = watch(props.name)

  const toggleChange = useCallback(
    e => {
      setValue(props.name, e)
    },
    [props.name, setValue]
  )

  return (
    <FieldControl name={props.name} disabled={formDisabled || disabled}>
      <Radio
        value={selected}
        className={[
          'flex flex-col space-y-1',
          formDisabled || disabled ? 'cursor-not-allowed' : undefined
        ]
          .join(' ')
          .trim()}
        onChange={toggleChange}
      >
        <div className='flex flex-col'>
          <Radio.Label as={FieldLabel} className='font-mono'>
            {label}
          </Radio.Label>
          {description && (
            <FieldMessage description>{description}</FieldMessage>
          )}
        </div>
        <div
          className={[
            'flex',
            horizontal
              ? 'w-full items-center justify-between'
              : 'flex-col space-y-2',
            className
          ]
            .join(' ')
            .trim()}
        >
          {options.map(({ label, value }) => (
            <Radio.Option
              key={value}
              value={value}
              className='flex cursor-pointer place-items-center focus:outline-none'
            >
              {({ active, checked }) => (
                <>
                  <i
                    className={[
                      'material-icons-sharp',
                      active ? 'ring ring-accent rounded-full' : ''
                    ]
                      .join(' ')
                      .trim()}
                  >
                    {checked
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </i>
                  <Radio.Label className='ml-2 cursor-pointer'>
                    {label}
                  </Radio.Label>
                  <input
                    type='radio'
                    name={props.name}
                    value={value}
                    className='hidden'
                    {...register?.(props.name, rules)}
                  />
                </>
              )}
            </Radio.Option>
          ))}
        </div>

        {error && <FieldMessage description>{description}</FieldMessage>}
      </Radio>
    </FieldControl>
  )
}

interface RadioGroupProps
  extends InputHTMLAttributes<Omit<HTMLInputElement, 'type'>> {
  /**
   * Label for input
   */
  label: string
  /**
   * Name of input (required for forms to work)
   */
  name: string
  /**
   * Radio options (required for forms to work)
   */
  options: Array<Record<'label' | 'value', string>>
  /**
   * Validation rules
   */
  rules?: RegisterOptions
  /**
   * Add description or helper text to input
   */
  description?: string
  /**
   * Renders horizontal rather than vertical default
   */
  horizontal?: boolean
}

export default RadioGroup
