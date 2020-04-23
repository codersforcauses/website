/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { getInitials } from 'helpers/user'
import { styles } from './styles'

const Avatar = ({
  dark = true,
  round = false,
  size = 'sm',
  ...props
}: Props) => {
  const initials = getInitials(props.name)
  return (
    <div
      className={`d-flex align-items-center justify-content-center ml-2 monospace ${
        round && 'rounded-circle'
      } ${props.className}`}
      css={styles(props.theme, size, dark, props.image)}
    >
      {props.name && <p className='m-0'>{initials}</p>}
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
