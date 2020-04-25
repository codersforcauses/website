/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { getInitials } from 'helpers/user'
import { styles } from './styles'

const Avatar = ({
  dark = false,
  round = false,
  size = 'sm',
  ...props
}: Props) => {
  let sizeToNum = 38
  if (size === 'md') sizeToNum = 72
  if (size === 'lg') sizeToNum = 144
  if (size === 'xl') sizeToNum = 288
  return (
    <div
      className={`d-flex align-items-center justify-content-center monospace ${
        round && 'rounded-circle'
      } ${props.className}`}
      css={styles(props.theme, sizeToNum, dark, props.image)}
    >
      {props.name && <p className='m-0'>{getInitials(props.name)}</p>}
    </div>
  )
}

export default withTheme(Avatar)

interface Props {
  dark?: Boolean
  round?: Boolean
  name?: string
  image?: string
  size?: string
  className?: string
  theme: Object
}
