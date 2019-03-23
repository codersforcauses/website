import React, { Component } from 'react'
import { Col, CardDeck } from 'reactstrap'
import CardItem, { CardItemContent } from './CardItem'
import { committee } from '../../data/constants.json'

export default class CommitteeCard extends Component {
  render () {
    return (
      <CardDeck>
        {committee.map(member => (
          <Col xs='12' md='6' lg='4' className='p-0'>
            <CardItem item={member} key={member.name} />
          </Col>
        ))}
      </CardDeck>
    )
  }
}
