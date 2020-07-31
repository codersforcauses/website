/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { FormGroup, Label, Input } from 'reactstrap'
import { Field } from 'formik'
import { styles } from './styles'

const Checkbox = ({
  label,
  color = 'primary',
  reverse,
  checked,
  ...props
}: RadioButtonProps) => {
  const theme = useTheme()

  return (
    <FormGroup
      css={styles(
        theme,
        color,
        checked,
        props.dark,
        props.disabled,
        props.invalid
      )}
    >
      <Label className='m-0'>
        {reverse && label}
        <Input type='radio' tag={Field} id={props.value} {...props} />
        <i
          aria-hidden
          className={`material-icons-sharp m${reverse ? 'l' : 'r'}-1`}
        >
          {checked ? 'radio_button_checked' : 'radio_button_unchecked'}
        </i>
        {!reverse && label}
      </Label>
    </FormGroup>
  )
}

export default Checkbox

export interface RadioButtonProps {
  checked?: boolean
  label: string
  className?: string
  color?: string
  dark?: boolean
  disabled?: Boolean
  invalid?: boolean
  name: string
  reverse?: boolean
  value: string
}
