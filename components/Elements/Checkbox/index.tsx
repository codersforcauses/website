/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { FormGroup, Label, Input } from 'reactstrap'
import { Field } from 'formik'
import { styles } from './styles'

const Checkbox = ({
  children,
  color = 'primary',
  reverse,
  checked,
  ...props
}: Props) => {
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
        {reverse && children}
        <Input type='checkbox' tag={Field} id={props.name} {...props} />
        <i
          aria-hidden
          className={`material-icons-sharp m${reverse ? 'l' : 'r'}-1`}
        >
          {checked ? 'check_box' : 'check_box_outline_blank'}
        </i>
        {!reverse && children}
      </Label>
    </FormGroup>
  )
}

export default Checkbox

interface Props {
  checked: boolean
  children: any
  className?: string
  color?: string
  dark?: boolean
  disabled?: Boolean
  invalid?: boolean
  name: string
  reverse?: boolean
  value?: string
}
