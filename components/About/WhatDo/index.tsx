import React from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'

const dos = [
  {
    icon: 'storage',
    title: 'Save Stuff',
    description: "We save so much stuff you wouldn't believe it"
  },
  {
    icon: 'how_to_reg',
    title: 'Code review',
    description: 'Oh boy do we do a lot of reviewing'
  },
  {
    icon: 'devices',
    title: 'Electronicals',
    description: 'You want them, we got them.'
  }
]

const What = (props: {
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

const WhatDo = () => (
  <Row>
    {dos.map(oneDo => (
      <Col
        xs={12}
        md={6}
        lg={12 / dos.length}
        className='m-0'
        key={oneDo.title}
      >
        <What {...oneDo} />
      </Col>
    ))}
  </Row>
)

export default WhatDo
