import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import style from './style'
import constants from '../../data/constants.json'

export default () => (
  <div className='bg-dark text-white py-5 footer'>
    {style}
    <Container>
      <Row>
        <Col
          xs={{ order: 1 }}
          md={{ size: 4, order: 0 }}
          className='mt-4 mt-md-0'
        >
          <img
            src='static/logo/wordmark_white.svg'
            alt='Coders for Causes wordmark'
            className='img-fluid mb-3 image'
          />
          <p className='font-weight-light m-0' style={{ fontSize: '0.9rem' }}>
            35 Stirling Highway
            <br />
            Crawley WA, 6009
          </p>
        </Col>
        <Col xs={6} md={2}>
          <h4 className='mb-3'>About us</h4>
          <ul className='list-unstyled'>
            <li>
              <Link href='/about'>
                <a>What we do</a>
              </Link>
            </li>
            <li>
              <Link href='/about#team'>
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
        <Col xs={6} md={2}>
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
        <Col xs={6} md={2}>
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
        <Col xs={6} md={2}>
          <h4 className='mb-3'>Social</h4>
          <ul className='list-unstyled'>
            <li>
              <a href='https://github.com/codersforcauses' target='_blank'>
                <p className='m-0'>GitHub</p>
              </a>
            </li>
            <li>
              <a
                href='https://www.facebook.com/codersforcauses'
                target='_blank'
              >
                <p className='m-0'>Facebook</p>
              </a>
            </li>
            <li>
              <a
                href='https://linkedin.com/company/coders-for-causes'
                target='_blank'
              >
                <p className='m-0'>LinkedIn</p>
              </a>
            </li>
            <li>
              <a href='http://discord.codersforcauses.org' target='_blank'>
                <p className='m-0'>Discord</p>
              </a>
            </li>
            <li>
              <a href={`mailto:${constants.email}`}>
                <p className='m-0'>Email</p>
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </div>
)
