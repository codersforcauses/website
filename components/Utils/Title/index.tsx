import { useTheme } from '@emotion/react'
import { Jumbotron, Container } from 'reactstrap'
import TypedText from '../TypedText'
import { styles } from './styles'

const Title = ({
  children,
  typed = false,
  ...props
}: {
  children: string
  typed?: boolean
}) => {
  const theme = useTheme()

  return (
    <Jumbotron
      className='bg-primary text-secondary d-flex align-items-center rounded-0 mb-0 text-monospace'
      css={styles(theme)}
    >
      <Container>
        <h1 className='mb-4'>
          {typed ? <TypedText text={[children]} /> : children}
        </h1>
      </Container>
    </Jumbotron>
  )
}

export default Title
