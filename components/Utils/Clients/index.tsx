/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Row, Col } from 'reactstrap'
import { randomise } from '../../../helpers/array'
import clients from '../../../data/clients.json'
import { style } from './style'

const clientsSample = clients
  .sort(randomise)
  .slice(0, Math.min(4, clients.length))

const Clients = (props: { theme: Object }) => (
  <Row className='justify-content-around' css={style(props.theme)}>
    {clientsSample.map(client => (
      <Col
        xs={6}
        md={2}
        key={client.name}
        className='d-flex align-items-center mb-4 mb-md-0 justify-content-center'
      >
        <img
          src={client.logo}
          alt={client.name}
          className='img-fluid client-logo'
        />
      </Col>
    ))}
  </Row>
)
export default withTheme(Clients)
