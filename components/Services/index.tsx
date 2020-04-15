import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import services from '../../data/services.json'

const Service = ({ icon, title, description }: ServiceProps) => (
  <Card className='text-center border-0'>
    <CardBody>
      <i className={`fa-3x fas fa-${icon}`} />
      <h4 className='mt-4 font-weight-bold'>{title}</h4>
      <p className='mb-0'>{description}</p>
    </CardBody>
  </Card>
)

interface ServiceProps {
  icon: string
  title: string
  description: string
}

export default () => (
  <Row>
    {services.map(service => (
      <Col
        xs={12}
        sm={6}
        lg={12 / services.length}
        className='mb-4'
        key={service.title}
      >
        <Service {...service} />
      </Col>
    ))}
  </Row>
)
