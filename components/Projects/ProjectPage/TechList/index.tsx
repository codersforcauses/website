/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { styles } from './styles'

const TechList = (props: { isDark: Boolean }) => {
  const theme = useTheme()

  return (
    <div
      className='d-flex align-items-center text-monospace'
      css={styles(theme)}
    >
      <div
        className={`mr-3 bigger bg-${props.isDark ? 'secondary' : 'primary'}`}
      >
        <i
          className={`material-icons-sharp text-${
            props.isDark ? 'primary' : 'secondary'
          } p-2 bigger`}
        >
          menu
        </i>
      </div>
      VueJs
    </div>
  )
}

export default TechList
