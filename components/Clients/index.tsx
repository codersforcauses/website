import React from 'react'
import { Row, Col } from 'reactstrap'
import { randomise } from '../../helpers/array'
import clients from '../../data/clients.json'
import style from './style'

export default () => {
  const clientsSample = clients
    .sort(randomise)
    .slice(0, Math.min(4, clients.length))
  return (
    <Row className='justify-content-center py-5'>
      {style}
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
}
