/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import Title from '../../Utils/Title'
import { styles } from './styles'

const SignUpPage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Title typed>./sign-up</Title>
    <Container className='py-5 my-5'>
      <Row>
        <Col xs={12} />
      </Row>
    </Container>
  </div>
)

export default withTheme(SignUpPage)
