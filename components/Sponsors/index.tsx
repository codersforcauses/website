import React from 'react'
import { Row, Col } from 'reactstrap'
import { randomise } from '../../helpers/array'
import sponsors from '../../data/sponsors.json'

const sponsorsSample = sponsors
  .sort(randomise)
  .slice(0, Math.min(3, sponsors.length))

export default () => (
  <Row className='justify-content-center py-5'>
    {sponsorsSample.map(sponsor => (
      <Col
        xs={3}
        md={2}
        key={sponsor.name}
        className='d-flex align-items-center mb-4 mb-md-0 justify-content-center'
      >
        <img src={sponsor.logo} alt={sponsor.name} className='img-fluid' />
      </Col>
    ))}
  </Row>
)
