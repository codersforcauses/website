/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Container, Row, Col } from 'reactstrap'
import Title from 'components/Utils/Title'
import Announcements from '../Announcements'
import { styles } from './styles'

const DashboardPage = () => {
  const theme = useTheme()

  return (
    <div css={styles(theme)}>
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

export default DashboardPage
