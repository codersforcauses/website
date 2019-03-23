import React from 'react'
import { Jumbotron, Button, Container } from 'reactstrap'
import Clients from '../components/Clients'
import Services from '../components/Services'
import constants from '../data/constants.json'

export default (props: {}) => (
  <div>
    <Jumbotron className='hero bg-dark text-white d-flex align-items-center rounded-0'>
      <Container>
        {style}
        <h1 className='mb-4'>./Innovation with a mission</h1>
        <Button color='secondary'>Work with us&nbsp;&nbsp;&nbsp;></Button>
      </Container>
    </Jumbotron>
    <Container className='py-5'>
      <h2 className='font-weight-bold mb-4'>We are a charity.</h2>
      <p className='lead'>
        Coders for Causes is a non for profit organisation that empowers
        charities and other non for profit organisations by connecting them with
        university students to develop technical solutions. We are a student-run
        club based in Perth, Western Australia with a wide range of clients.
        Whether you are looking for technical advice or a long term project, get
        in touch with us for more information
      </p>
    </Container>
    <div className='bg-light'>
      <Container className='py-5'>
        <Clients />
      </Container>
    </div>
    <Container className='py-5'>
      <h2 className='font-weight-bold mb-5'>What we offer.</h2>
      <Services />
    </Container>
    <div className='bg-dark text-white py-5'>
      <Container className='py-5 mb-5'>
        <h1 className='display-3 mb-3'>Let's talk.</h1>
        <a href={`mailto:${constants.email}`} className='text-white'>
          <h3>{constants.email}</h3>
        </a>
      </Container>
    </div>
  </div>
)

const style = (
  <style jsx>{`
    .hero {
      padding: 50px 0;
      height: 500px;
    }
  `}</style>
)
