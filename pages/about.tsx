import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommitteeCard from '../components/Team'

export default (props: {}) => (
  <div>
    {style}
    <Container>
      <Row className='hero pad-4 bg-white d-flex align-items-center'>
        <Col xs='12' lg='7'>
          <h3 className='header'>
            We build software for charities
          </h3>
          <p>
            Coders for Causes is a non for profit organisation that empowers
            charities and other non for profit organisations by connecting them
            with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range
            of clients. Whether you are looking for technical advice or a long
            term project, get in touch with us for more information.
          </p>
        </Col>

        <Col xs='12' lg='5' className='border border-dark w-100 h-100' />
      </Row>
    </Container>

    <hr />

    <Container>
      <Row className='pad-4'>
        <Col xs='12'>
          <h3 className='header'>
            Meet the Committee
          </h3>
        </Col>
        <Col xs='12'>
          <CommitteeCard />
        </Col>
      </Row>

      <Row className='pad-4'>
        <Col xs='12'>
          <h3 className='header'>
            Our Clients
          </h3>
        </Col>
      </Row>
    </Container>
  </div>
)

const style = (
  <style jsx>{`
    .header {
      font-weight: bolder;
      margin-bottom: 1.2rem;
    }
    .pad-4 {
      padding: 4rem 0;
    }
    .hero {
      height: 40vh;
      min-height: 26rem;
      max-height: 50rem;
      margin-top: 4.5rem;
    }
    hr {
      width: 100vw;
      left: 0;
      right:0;
      background-color: black;
      margin: 0;
    }
    .team {
      
    }
  `}</style>
)
