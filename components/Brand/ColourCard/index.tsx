/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Card, CardHeader, CardFooter } from 'reactstrap'
import { Theme } from 'lib/theme'
import { styles } from './styles'

const ColourCard = (props: {
  color: string
  name: string
  className?: string
  theme: Theme
}) => (
  <Card
    className={`rounded-0 border-0 w-100 justify-content-between monospace ${props.className}`}
    css={styles(props.theme, props.color)}
  >
    <CardHeader className='bg-transparent border-0'>{props.name}</CardHeader>
    <CardFooter className='bg-transparent border-0 text-uppercase'>
      {props.theme.colors[props.color]}
    </CardFooter>
  </Card>
)

export default withTheme(ColourCard)
