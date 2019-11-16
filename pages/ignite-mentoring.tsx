import React from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import ProjectBanner from '../components/ProjectBanner'

export default (props: {}) => (
  <>
    {style}
    <ProjectBanner imageSrc='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ee5cd944-32c7-4f43-8033-9f857c473c19/d5lda4b-cdac831b-bba3-478b-828b-6ac040bbc4ff.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VlNWNkOTQ0LTMyYzctNGY0My04MDMzLTlmODU3YzQ3M2MxOVwvZDVsZGE0Yi1jZGFjODMxYi1iYmEzLTQ3OGItODI4Yi02YWMwNDBiYmM0ZmYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kWWaMk5NoM45PL6o-mdX34m0mDzxXpi8lCJy4jw_pak' />

    <Container className='py-5 my-5'>
      <Row>
        <Col xs={7}>
          <h1 className='display-4 mb-4'>Ignite Mentoring</h1>
          <p className='lead'>
            Alright, you wanna know fine?! I admit it, I don't know how King
            Crimson works!! He erases time but what does that mean?! If you
            erase time then shouldn't he not be there?! What does that mean-
            what does he mean he erases time?! He erases time but stuff still
            happens in it!! How does he know what happens in it when he erases
            it?! It doesn't make any sense you can't erase time! you can't erase
            time! fine! you can freeze time and you can turn back time, but you
            can't erase time!! That doesn't make sense! It doesn't make sense!!
            You erase time nothing happens in it!! I don't know, I don't know
            someone tell me! someone tell me how King Crimson works! I need to
            know! I need to know how king crimson works, please!!! Please, just
            tell me!! I need to know! someone explain it! Its confusing I don't
            know, how does King Crimson work?!?! How does it work?! How does
            King Crimson work please!! Please someone tell me I need to know how
            King Crimson works!!!!
          </p>
        </Col>
        <Col xs={1} />
        <Col md={4}>
          <i className='fas fa-fw fa-laptop-code icon-left' />
          <h5 className='text-right'>Web Development</h5>
          <br />
          <i className='far fa-fw fa-calendar-alt icon-left' />
          <h5 className='text-right'>February 2019</h5>

          <Button
            outline
            color='primary'
            className='d-none d-md-block big-button'
          >
            Visit website
          </Button>
        </Col>
      </Row>
      <Row className='pad-mid'>
        <Col md={8}>
          <h3>Technologies used</h3>
        </Col>
        <Col xs={4}>
          <h3>Potential impact</h3>
        </Col>
      </Row>
      <Row className='pad-bot'>
        <Col md={12}>
          <h3>Members</h3>
        </Col>
      </Row>
    </Container>
  </>
)

const style = (
  <style jsx>{`
    .header {
      font-weight: bolder;
      margin-bottom: 1.2rem;
    }
    .pad-top {
      padding: 5rem 0 0 0;
    }
    .pad-mid {
      padding: 3rem 0;
    }
    .pad-bot {
      padding: 0 0 6rem 0;
    }
    .icon-left {
      font-size: 1.5em;
      padding: 1.5rem 0 1.3rem 0;
    }
    .text-right {
      display: inline;
      padding: 0 0 0 3rem;
    }
    .big-button {
      font-size: 1.5rem;
      margin: 1.2rem 0 0 0;
      padding: 0.5rem 2rem;
    }
    .hero {
      margin-top: 4.5rem;
      border-radius: 0;
    }
  `}</style>
)
