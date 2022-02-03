/* eslint-disable react/display-name */
import { useContext, forwardRef, PropsWithChildren } from 'react'
import { FieldControlContext } from './FieldControl'

const FieldLabel = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<FieldLabelProps>
>(({ noLabel, dark, ...props }, ref) => {
  const { disabled, name, required } = useContext(FieldControlContext)
  const disabledClass = disabled ? 'opacity-50' : undefined
  return (
    <label
      htmlFor={name}
      id={`${name}-label`}
      ref={ref}
      className={
        noLabel
          ? 'sr-only'
          : [
              'font-black',
              dark ? 'text-secondary' : 'text-primary dark:text-secondary',
              disabledClass,
              props.className
            ]
              .join(' ')
              .trim()
      }
    >
      {props.children}
      {required &&
        (noLabel ? (
          <i>required</i>
        ) : (
          <>
            <span aria-hidden className='opacity-50 select-none'>
              *
            </span>
            <i className='sr-only'>required</i>
          </>
        ))}
    </label>
  )
})

export default FieldLabel

interface FieldLabelProps {
  noLabel?: boolean
  dark?: boolean
  className?: string
}
