import React from 'react'
import { Row, Col } from 'reactstrap'
import { randomise } from '../../helpers/array'
import partners from '../../data/partners.json'

const partnersSample = partners
  .sort(randomise)
  .slice(0, Math.min(3, partners.length))

export default () => (
  <Row className='justify-content-center py-5'>
    {partnersSample.map(partner => (
      <Col
        xs={4}
        md={3}
        key={partner.name}
        className='d-flex align-items-center justify-content-center'
      >
        <img src={partner.logo} alt={partner.name} className='img-fluid' />
      </Col>
    ))}
  </Row>
)
