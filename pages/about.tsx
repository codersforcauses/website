import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import { CommitteeCard } from '../components/Committee'
import Clients from '../components/Clients'
import Sponsors from '../components/Sponsors'
import Partners from '../components/Partners'
import SpecialThanks from '../components/SpecialThanks'

export default (props: {}) => (
  <>
    {style}
    <Jumbotron id='#' className='mb-0 bg-dark hero pad text-white'>
      <Container>
        <Row className='my-5 d-flex align-items-center'>
          <Col xs={12} lg={7}>
            <h2 className='header'>We build software for charities</h2>
            <p className='lead'>
              Coders for Causes is a not for profit organisation that empowers
              charities and other not for profit organisations by connecting
              them with university students to develop technical solutions. We
              are a student-run club based in Perth, Western Australia with a
              wide range of clients. Whether you are looking for technical
              advice or a long term project, get in touch with us for more
              information.
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>

    <Container id='team'>
      <Row className='pad'>
        <Col xs={12}>
          <h3 className='header'>Meet the Team</h3>
        </Col>
        <Col xs={12}>
          <CommitteeCard />
        </Col>
      </Row>
    </Container>

    <Jumbotron className='pad m-0'>
      <Container>
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Our Clients</h3>
          </Col>
        </Row>
        <Clients />
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Our Sponsors</h3>
          </Col>
        </Row>
        <Sponsors />
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Our Partnered Clubs</h3>
          </Col>
        </Row>
        <Partners />
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Special Thanks</h3>
          </Col>
        </Row>
        <SpecialThanks />
      </Container>
    </Jumbotron>
  </>
)

const style = (
  <style jsx>{`
    .header {
      font-weight: bolder;
      margin-bottom: 1.2rem;
    }
    .pad {
      padding: 6.6rem 0;
    }
    .hero {
      margin-top: 4.5rem;
      border-radius: 0;
    }
  `}
  </style>
)
