import React from 'react'
import { Row, Col } from 'reactstrap'
import { committee } from 'data/committee.json'
import CommitteeCard from './CommitteeCard'

const Committee = () => (
  <Row>
    {committee.map(member => (
      <Col xs={6} lg={4} key={member.name} className='mt-3 pt-3'>
        <CommitteeCard item={member} />
      </Col>
    ))}
  </Row>
)

export default Committee
