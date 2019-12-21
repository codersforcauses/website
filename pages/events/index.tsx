import React from 'react'
import { Jumbotron, Container } from 'reactstrap'

import Events from '../../components/Events'

import workshopEvents from '../../data/events_workshop.json'
import industryEvents from '../../data/events_industry.json'
import socialEvents from '../../data/events_social.json'

export default () => (
  <>
    {style}
    <Jumbotron className='bg-dark text-white d-flex align-items-center rounded-0'>
      <Container style={{ width: '90%' }}>
        <h1>Events</h1>
      </Container>
    </Jumbotron>
    <Container>
      <Events type='Workshops' direction='right' events={workshopEvents} />
      <Events
        type='Industry Meetups'
        direction='left'
        events={industryEvents}
      />
      <Events type='Social Events' direction='right' events={socialEvents} />
    </Container>
  </>
)

const style = (
  <style jsx>{`
    .jumbotron {
      margin-top: 64px;
      height: 300px;
    }
  `}
  </style>
)
