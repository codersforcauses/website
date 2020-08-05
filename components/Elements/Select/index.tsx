/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState } from 'react'
import { Field } from 'formik'
import {
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input,
  CustomInput,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { styles } from './styles'

const Select = ({
  label,
  error,
  color = 'primary',
  className,
  description,
  touched,
  options,
  ...props
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selected, setSelected] = useState(props.value)
  const theme = useTheme()

  return (
    <FormGroup css={styles(theme)}>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(prevState => !prevState)}
      >
        <DropdownToggle tag='span'>
          {label && (
            <Label for={props.name} className='monospace'>
              {label}
            </Label>
          )}
          <Input
            type='text'
            bsSize='lg'
            // tag={Field}
            id={props.name}
            invalid={error && touched}
            readOnly
            className={`rounded-0 text-primary border-${color} ${className}`}
            {...props}
          />
        </DropdownToggle>
        <DropdownMenu className={`rounded-0 border-${color} border-top-0 menu`}>
          {options.map(option => (
            <DropdownItem
              key={option}
              className='px-3 py-2 d-flex align-center justify-content-between'
              onClick={() => setSelected(option)}
            >
              {option}
              {option === selected && (
                <i className='material-icons-sharp icon'>check_circle</i>
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
        <FormFeedback>{error}</FormFeedback>
        {!error && <FormText>{description}</FormText>}
      </Dropdown>
    </FormGroup>
  )
}

export default Select

interface Props {
  color?: string
  size?: string
  label?: string
  className?: string
  name: string
  options: Array<string>
  value?: string
  description?: string
  error?: string
  touched?: boolean
  placeholder?: string
  onClick?: Function
  onBlur?: Function
}
