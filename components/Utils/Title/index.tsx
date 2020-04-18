/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Jumbotron, Container } from 'reactstrap'
import TypedText from '../TypedText'
import { styles } from './styles'

const Title = ({
  children,
  typed = false,
  ...props
}: {
  children: string
  theme: Object
  typed?: boolean
}) => (
  <Jumbotron
    className='bg-dark text-white d-flex align-items-center rounded-0 mb-0 monospace'
    css={styles(props.theme)}
  >
    <Container>
      <h1 className='mb-4'>
        {typed ? <TypedText text={[children]} /> : children}
      </h1>
    </Container>
  </Jumbotron>
)

export default withTheme(Title)
