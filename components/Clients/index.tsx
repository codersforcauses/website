import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { randomise } from '../../helpers/array'
import clients from '../../data/clients.json'
import style from './style'

export default () => {
  const clientsSample = clients
    .sort(randomise)
    .slice(0, Math.min(4, clients.length))
  return (
    <Row className='justify-content-center'>
      {style}
      {clientsSample.map(client => (
        <Col
          xs={6}
          md={2}
          key={client.name}
          className='d-flex align-items-center'
        >
          <img
            src={client.logo}
            alt={client.name}
            className='img-fluid p-3 client-logo'
          />
        </Col>
      ))}
    </Row>
  )
}
