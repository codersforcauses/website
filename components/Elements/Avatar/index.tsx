/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { getInitials } from 'helpers/user'
import { styles } from './styles'

const sizeToNum = {
  sm: 38,
  md: 72,
  lg: 144,
  xl: 288
}

const Avatar = ({
  dark = false,
  round = false,
  size = 'sm',
  ...props
}: Props) => {
  const theme = useTheme()

  return (
    <div
      className={`d-flex align-items-center justify-content-center monospace ${
        round && 'rounded-circle'
      } ${props.className}`}
      css={styles(theme, sizeToNum[size], dark, props.image)}
    >
      {props.name && <p className='m-0'>{getInitials(props.name)}</p>}
    </div>
  )
}

export default Avatar

interface Props {
  dark?: boolean
  round?: boolean
  name?: string
  image?: string
  size?: string
  className?: string
}
