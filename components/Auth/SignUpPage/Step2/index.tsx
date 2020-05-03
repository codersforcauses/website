import React, { useState } from 'react'
import { Row, Col, Card, CardText, Button } from 'reactstrap'
import Router from 'next/router'

const Step1 = (props: { route?: string; previousStep: Function }) => {
  // Router.replace(props.route ? props.route : '/dashboard')

  return (
    <Row>
      <Col xs={12} className='mb-4'>
        <h3 className='font-weight-bold'>Payment</h3>
        <p>
          As part of our affiliation with the UWA Student Guild, we are required
          to charge a membership fee. While we strive to make all our content
          and events open to all, there are perks to being a financial member to
          the club. These include:
          <ul>
            <li>Ability to join the club committee and vote</li>
            <li>Work on our summer and winter projects with other members</li>
            <li>Members discounts to payed events</li>
          </ul>
          Chose a payment option for your membership below:
        </p>
      </Col>
      <Col xs={12} md={6}>
        <Card body outline color='primary' className='rounded-0 text-center'>
          <CardText>
            <i className='material-icons-sharp md-xl'>monetization_on</i>
          </CardText>

          <Button color='primary' className='rounded-0'>
            Pay with Cash
          </Button>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card body inverse color='primary' className='rounded-0 text-center'>
          <CardText>
            <i className='material-icons-sharp md-xl'>credit_card</i>
          </CardText>

          <Button color='secondary' className='rounded-0'>
            Pay with Card Online
          </Button>
        </Card>
      </Col>
      <Col className='mt-4 d-flex justify-content-end'>
        <Button color='link'>Skip Payment For Now</Button>
      </Col>
    </Row>
  )
}

export default Step1
