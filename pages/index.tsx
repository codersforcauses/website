import React from 'react'
import { Jumbotron, Button, Container } from 'reactstrap'
import Clients from '../components/Clients'
import Services from '../components/Services'

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
  </div>
)

const style = (
  <style jsx>{`
    .hero {
      padding: 50px 0;
      height: calc(100vh - 100px);
    }
  `}</style>
)
