/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Col, CardDeck } from 'reactstrap'
import CommitteeCard from './CommitteeCard'
import { committee } from '../../../data/committee.json'

const Committee = () => (
  <CardDeck>
    {committee.map((member) => (
      <Col xs={12} sm={6} lg={4} className='p-0' key={member.name}>
        <CommitteeCard item={member} />
      </Col>
    ))}
  </CardDeck>
)

export default withTheme(Committee)
