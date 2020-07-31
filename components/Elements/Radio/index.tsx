import React from 'react'
import RadioButton, { RadioButtonProps } from './RadioButton'

const Radio = ({ className, label, items, value, ...props }: Props) => {
  return (
    <div role='group' aria-labelledby={label} className={className}>
      {label && <span>{label}</span>}
      {items.map((item: RadioButtonProps) => (
        <RadioButton
          key={item.value}
          checked={item.value === value}
          {...props}
          {...item}
        />
      ))}
    </div>
  )
}

export default Radio

interface Props {
  className?: string
  color?: string
  dark?: boolean
  disabled?: Boolean
  invalid?: boolean
  label?: string
  name: string
  reverse?: boolean
  value: string
  items: Array<any>
}
