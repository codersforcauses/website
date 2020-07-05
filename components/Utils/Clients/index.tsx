import React from 'react'
import { Row, Col } from 'reactstrap'
import { randomise } from '../../../helpers/array'
import clients from '../../../data/clients.json'

const clientsSample = clients
  .sort(randomise)
  .slice(0, Math.min(4, clients.length))

const Clients = () => (
  <Row className='justify-content-around py-5'>
    {clientsSample.map(client => (
      <Col
        xs={6}
        md={2}
        key={client.name}
        className='d-flex align-items-center mb-4 mb-md-0 justify-content-center'
      >
        <a href={client.repo} target='_blank' rel='noopener noreferrer'>
          <img src={client.logo} alt={client.name} className='img-fluid logo' width='100' height='100' />
        </a>
      </Col>
    ))}
  </Row>
)
export default Clients
