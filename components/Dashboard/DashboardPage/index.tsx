/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Jumbotron, Container, Row, Col, Card, Input } from 'reactstrap'
import Title from 'components/Utils/Title'
import Announcements from '../Announcements'
import { styles } from './styles'

const BrandPage = (props: { theme: Object }) => {
  return (
    <div css={styles(props.theme)}>
      <Title typed>./dashboard</Title>
      <Container className='py-5'>
        <Row>
          <Col md={8} />
          <Col md={4}>
            <h6 className='font-weight-bold mb-3'>Announcements</h6>
            <Announcements />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withTheme(BrandPage)
