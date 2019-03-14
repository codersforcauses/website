import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default (props: {}) => (
  <div>
    <Container>
      <div className='hero bg-white d-flex align-items-center rounded-0 border-bottom border-dark'>
        {style}
        <Row>
          <Col xs='12' lg='7'>
            <h3 className='main-header'>
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

          <Col />
        </Row>
      </div>
    </Container>
  </div>
)

const style = (
  <style jsx>{`
    .hero {
      padding: 4rem 0;
      height: 50vh;
      min-height: 26rem;
    }
    .main-header {
      font-weight: bolder;
      margin-bottom: 1.2rem;
    }
  `}</style>
)
