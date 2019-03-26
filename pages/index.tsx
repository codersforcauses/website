import React from 'react'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap'
import Clients from '../components/Clients'
import Services from '../components/Services'
import constants from '../data/constants.json'

export default (props: {}) => (
  <div>
    <Jumbotron className='hero bg-dark text-white d-flex align-items-center rounded-0'>
      <Container>
        {style}
        <h1 className='mb-4'>./Innovation with a mission</h1>
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
        Work with us&ensp;&nbsp;>
      </Button>
    </Container>
    <div className='bg-light'>
      <Container>
        <Clients />
      </Container>
    </div>
    <Container className='py-5 my-5'>
      <Services />
    </Container>
    <div className='py-5 bg-dark text-white'>
      <Container className='py-5'>
        <Row>
          <Col md={8}>
            <h1 className='display-3 mb-3'>Let's talk.</h1>
            <a href={`mailto:${constants.email}`} className='text-white'>
              <h3 className='scalable'>{constants.email}</h3>
            </a>
          </Col>
          <Col sm={4} className='d-none d-sm-block'>
            <h1 className='display-1 text-right'>;)</h1>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
)

const style = (
  <style jsx>{`
    .hero {
      margin-top: 4rem;
      height: 500px;
    }
    .scalable {
      font-size: calc(2vmin + 0.8rem);
    }
  `}</style>
)
