import React from 'react'
import { Col, CardDeck } from 'reactstrap'
import CardItem from './CardItem'
import { committee } from '../../data/committee.json'

export const CommitteeCard = () => (
  <CardDeck>
    {committee.map(member => (
      <Col xs={12} md={6} lg={4} className='p-0' key={member.name}>
        <CardItem item={member} />
      </Col>
    ))}
  </CardDeck>
)
