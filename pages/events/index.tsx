import React from 'react'
import { Jumbotron, Container, Button } from 'reactstrap'

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
      <div className='d-flex justify-content-center m-4'>
        <a href='#Workshops' className='link-unstyled'><Button className='d-none d-md-block btn btn-outline-primary link-unstyled quick-link'>Workshops</Button></a>
        <a href='#Industry Meetups' className='link-unstyled'><Button className='d-none d-md-block btn btn-outline-primary quick-link'>Industry Meetups</Button></a>
        <a href='#Social Events' className='link-unstyled'><Button className='d-none d-md-block btn btn-outline-primary quick-link'>Social Events</Button></a>
      </div>
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

    .quick-link {
      margin: 0 5px;
    }
  `}
  </style>
)
