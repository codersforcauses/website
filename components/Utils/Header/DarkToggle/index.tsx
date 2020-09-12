/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useContext } from 'react'
import { Button } from 'reactstrap'
import { styles } from './styles'
import { DarkContext } from 'helpers/user'

const DarkToggle = (props) => {
  const theme = useTheme()
  const [isDark, setDark] = useState(false)
  const toggleDark = () => setDark(previousDark => !previousDark)

  return (
    <Button color='link' onClick={toggleDark}>
      <i css={styles(theme)} className='material-icons-sharp'>
        {isDark ? 'wb_sunny' : 'nights_stay'}
      </i>
    </Button>
  )
}

export default DarkToggle
