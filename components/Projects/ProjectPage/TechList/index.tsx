/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import {} from 'reactstrap'
import { style } from './style'

const TechList = (props: { theme: Object }) => (
  <div className='d-flex align-items-center monospace' css={style(props.theme)}>
    <div className='bg-dark mr-3 bigger'>
      <i className='material-icons-sharp text-white p-2 bigger'>menu</i>
    </div>
    VueJs
  </div>
)

export default withTheme(TechList)
