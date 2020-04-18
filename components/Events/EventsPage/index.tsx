/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Container, Row, Col } from 'reactstrap'
import Title from '../../Utils/Title'
import EventCard from './EventCard'
import { styles } from './styles'

const EventPage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Title typed>./events</Title>
    <Container className='my-5 py-5 bg-white rounded-0'>
      <Row>
        <Col xs={12} sm={6} lg={4} className='d-flex align-items-center'>
          <h2 className='monospace'>Workshops</h2>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <EventCard />
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <EventCard />
        </Col>
      </Row>
    </Container>
  </div>
)

export default withTheme(EventPage)
