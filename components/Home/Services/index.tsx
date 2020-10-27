import * as React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import services from 'data/services.json'

const Service = (props: {
  icon: string
  title: string
  description: string
}) => (
  <Card className='text-center border-0 bg-transparent'>
    <CardBody className='px-0'>
      <i className='material-icons-sharp md-lg'>{props.icon}</i>
      <p className='mt-4 font-weight-bold text-monospace text-larger'>
        {props.title}
      </p>
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

export default React.memo(Services)
