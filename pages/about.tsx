import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import CommitteeCard from '../components/Team'

export default (props: {}) => (
  <div>
    {style}
    <Jumbotron className='mb-0 bg-dark hero pad text-white'>
      <Container>
        <Row className='my-5 d-flex align-items-center'>
          <Col xs={12} lg={7}>
            <h2 className='header'>
              We build software for charities
            </h2>
            <p className='lead'>
              Coders for Causes is a not for profit organisation that empowers
              charities and other not for profit organisations by connecting them
              with university students to develop technical solutions. We are a
              student-run club based in Perth, Western Australia with a wide range
              of clients. Whether you are looking for technical advice or a long
              term project, get in touch with us for more information.
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>

    <Container>
      <Row className='pad'>
        <Col xs={12}>
          <h3 className='header'>
            Meet the Committee
          </h3>
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
            <h3 className='header'>
              Our Clients
            </h3>
          </Col>
          <Col />
        </Row>
      </Container>
    </Jumbotron>
  </div>
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
    .header-img {
      max-width: 500px;
      margin-top: 1rem;
    }
  `}</style>
)
