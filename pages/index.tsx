import React from 'react'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap'
import TypedText from '../components/TypedText'
import Clients from '../components/Clients'
import Services from '../components/Services'
import Face from '../components/Face'
import constants from '../data/constants.json'

export default () => (
  <>
    <Jumbotron className='hero bg-dark text-white d-flex align-items-center rounded-0'>
      <Container>
        {style}
        <h1 className='mb-4'>
          <TypedText
            text={[
              './Innovation with a mission',
              './Programming with purpose',
              './Do good. ^200Write code',
              './Made with code',
              './Made with ^500❤️',
              '#include git.c',
              'class Coders extends Causes',
              'sudo rm -rf /'
            ]}
          />
        </h1>
      </Container>
    </Jumbotron>
    <Container className='py-5 my-5'>
      <h2 className='font-weight-bold mb-4'>We are a charity.</h2>
      <p className='lead'>
        Coders for Causes is a non for profit organisation that empowers
        charities and other non for profit organisations by connecting them with
        university students to develop technical solutions. We are students
        powered and all of our members are volunteers.
      </p>
      <Button color='primary' outline>
        Work with us &ensp;<span className='arrow'>&raquo;</span>
      </Button>
    </Container>
    <div className='bg-light'>
      <Container className='bg-light py-5'>
        <Clients />
      </Container>
    </div>
    <Container className='py-5 my-5'>
      <Services />
    </Container>
    <div className='pt-5 pb-md-5 bg-dark text-white'>
      <Container className='py-5'>
        <Row>
          <Col md={8}>
            <h1 className='display-3 mb-3'>Let's talk.</h1>
            <a href={`mailto:${constants.email}`} className='text-white'>
              <h3 className='scalable m-0'>{constants.email}</h3>
            </a>
          </Col>
          <Col sm={4} className='d-none d-sm-block'>
            <Face />
          </Col>
        </Row>
      </Container>
    </div>
  </>
)

const style = (
  <style jsx>{`
    .hero {
      margin-top: 4.5rem;
      border-radius: 0;
      height: 500px;
    }
  `}
  </style>
)
