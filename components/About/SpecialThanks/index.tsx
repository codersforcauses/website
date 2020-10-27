import * as React from 'react'
import { Row, Col } from 'reactstrap'
import { randomise } from 'helpers/array'
import specialThanks from 'data/specialThanks.json'

const specialThanksSample = specialThanks
  .sort(randomise)
  .slice(0, Math.min(2, specialThanks.length))

const SpecialThanks = () => (
  <Row className='justify-content-around pt-5'>
    {specialThanksSample.map(object => (
      <Col
        xs={3}
        md={2}
        key={object.name}
        className='d-flex align-items-center justify-content-center'
      >
        <img src={object.logo} alt={object.name} className='img-fluid logo' />
      </Col>
    ))}
  </Row>
)

export default React.memo(SpecialThanks)
