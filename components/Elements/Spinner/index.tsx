import { useTheme } from '@emotion/react'
import { Spinner as BootstrapSpinner } from 'reactstrap'
import { styles } from './styles'

const Spinner = ({
  border = '2px',
  color = 'primary',
  ...props
}: {
  color?: string
  border?: string
  size?: string
  type?: string
  className?: string
  style?: Object
}) => {
  const theme = useTheme()

  return (
    <BootstrapSpinner color={color} {...props} css={styles(theme, border)} />
  )
}

export default Spinner
