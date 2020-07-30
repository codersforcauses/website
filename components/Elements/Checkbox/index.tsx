/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { FormGroup, Label, Input } from 'reactstrap'
import { styles } from './styles'

const Checkbox = ({
  children,
  color = 'primary',
  reverse,
  value,
  ...props
}: Props) => {
  const theme = useTheme()

  return (
    <FormGroup
      css={styles(
        theme,
        color,
        value,
        props.dark,
        props.disabled,
        props.invalid
      )}
    >
      <Label className='m-0'>
        {reverse && children}
        <Input type='checkbox' id={props.name} checked={value} {...props} />
        <i className={`material-icons-sharp m${reverse ? 'l' : 'r'}-1`}>
          {value ? 'check_box' : 'check_box_outline_blank'}
        </i>
        {!reverse && children}
      </Label>
    </FormGroup>
  )
}

export default Checkbox

interface Props {
  children: any
  className?: string
  color?: string
  dark?: boolean
  disabled?: Boolean
  invalid?: boolean
  id?: string
  name?: string
  reverse?: boolean
  value?: boolean
  onBlur?: Function
  onChange?: Function
}
