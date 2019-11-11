import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import style from './style'

export default () => (
  <div className='bg-dark text-white py-5 footer'>
    {style}
    <Container>
      <Row>
        <Col md={3} className='mb-3'>
          <img
            src='/logo/wordmark_white.svg'
            alt='Coders for Causes wordmark'
            className='img-fluid w-50 mb-3'
          />
        </Col>
        <Col md={3}>
          <h4 className='mb-3'>About us</h4>
          <ul className='list-unstyled'>
            <li>
              <Link href='/about'>
                <a>What we do</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a>Meet the team</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a>Contact us</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <h4 className='mb-3'>Projects</h4>
          <ul className='list-unstyled'>
            <li>
              <Link href='/projects'>
                <a>Our services</a>
              </Link>
            </li>
            <li>
              <Link href='/projects'>
                <a>Previous projects</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <h4 className='mb-3'>Events</h4>
          <ul className='list-unstyled'>
            <li>
              <Link href='/about'>
                <a>Upcoming events</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a>Past events</a>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </div>
)
