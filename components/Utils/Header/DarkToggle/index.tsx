/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext, useEffect } from 'react'
import { Button } from 'reactstrap'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'

const DarkToggle = (props: { handleDarkToggle: Function }) => {
  const theme = useTheme()
  const isDark = useContext(DarkContext)

  useEffect(() => {
    isDark !== undefined &&
      localStorage.setItem('dark-theme', isDark.toString())
  }, [isDark])

  return (
    <Button
      color='link'
      className='py-0 h-100'
      onClick={props.handleDarkToggle}
    >
      <i
        css={styles(theme, isDark)}
        className='material-icons-sharp d-flex align-items-center justify-content-center'
      >
        <span className='light-icon'>wb_sunny</span>
        <span className='dark-icon'>nights_stay</span>
      </i>
    </Button>
  )
}

export default DarkToggle
