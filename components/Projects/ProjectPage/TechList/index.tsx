/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { styles } from './styles'

const TechList = (props: { theme: Object }) => (
  <div
    className='d-flex align-items-center monospace'
    css={styles(props.theme)}
  >
    <div className='bg-primary mr-3 bigger'>
      <i className='material-icons-sharp text-secondary p-2 bigger'>menu</i>
    </div>
    VueJs
  </div>
)

export default withTheme(TechList)
