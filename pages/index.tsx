import React from 'react'
import { Jumbotron, Button, Container } from 'reactstrap'

export default (props: {}) => (
  <div>
    <Jumbotron className='hero bg-dark text-white d-flex align-items-center rounded-0'>
      <Container>
        {style}
        <h1 className='mb-4'>./Innovation with a mission</h1>
        <Button color='secondary'>Work with us&nbsp;&nbsp;&nbsp;></Button>
      </Container>
    </Jumbotron>
  </div>
)

const style = (
  <style jsx>{`
    .hero {
      padding: 50px 0;
      height: calc(100vh - 200px);
      margin-bottom: 100vh;
    }
  `}</style>
)
