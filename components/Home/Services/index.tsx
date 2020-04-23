import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import services from 'data/services.json'

const Service = (props: {
  icon: string
  title: string
  description: string
}) => (
  <Card className='text-center border-0'>
    <CardBody>
      <i className='material-icons-sharp md-lg'>{props.icon}</i>
      <h4 className='mt-4 font-weight-bold'>{props.title}</h4>
      <p className='mb-0'>{props.description}</p>
    </CardBody>
  </Card>
)

const Services = () => (
  <Row>
    {services.map(service => (
      <Col
        xs={12}
        md={6}
        lg={12 / services.length}
        className='m-0'
        key={service.title}
      >
        <Service {...service} />
      </Col>
    ))}
  </Row>
)

export default Services
