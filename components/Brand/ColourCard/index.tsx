/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Card, CardHeader, CardFooter } from 'reactstrap'
import { Theme } from 'lib/theme'
import { styles } from './styles'

const ColourCard = (props: {
  color: string
  name: string
  className?: string
}) => {
  const theme: Theme = useTheme()

  return (
    <Card
      className={`rounded-0 border-0 w-100 justify-content-between monospace ${props.className}`}
      css={styles(theme, props.color)}
    >
      <CardHeader className='bg-transparent border-0'>{props.name}</CardHeader>
      <CardFooter className='bg-transparent border-0 text-uppercase'>
        {theme?.colors[props.color]}
      </CardFooter>
    </Card>
  )
}

export default ColourCard
