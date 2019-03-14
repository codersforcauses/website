import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'

export default (props: {}) => (
  <div>
    <Jumbotron className='hero bg-white text-black d-flex align-items-center rounded-0'>
      <Container>
        {style}
        <Row>
          <Col xs='12' lg='6'>
            <h3 className='main-header text-nowrap'>
              We build software for charities
            </h3>
            <p>
              Coders for Causes is a non for profit organisation that empowers
              charities and other non for profit organisations by connecting them
              with university students to develop technical solutions. We are a
              student-run club based in Perth, Western Australia with a wide range
              of clients. Whether you are looking for technical advice or a long
              term project, get in touch with us for more information
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </div>
)

const style = (
  <style jsx>{`
    .hero {
      padding: 50px 0;
      height: 50vh;
    }
    .main-header {
      font-weight: bolder;
      margin-bottom: 1.2rem;
    }
  `}</style>
)
