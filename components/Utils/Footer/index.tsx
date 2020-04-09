/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import { style } from './style'

const Footer = (props: { theme: Object }) => (
  <footer className='bg-dark text-white py-5 footer' css={style(props.theme)}>
    <Container>
      <Row>
        <Col md={3} className='mb-3'>
          <img
            src='/logo/cfc_logo_white_full.svg'
            alt='Coders for Causes wordmark'
            className='img-fluid w-75 mb-3'
          />
        </Col>
        <Col md={3}>
          <h4 className='mb-3'>About us</h4>
          <ul className='list-unstyled m-md-0'>
            <li>
              <Link href='/about#_what_we_do'>
                <a>What we do</a>
              </Link>
            </li>
            <li>
              <Link href='/about#_meet_the_team'>
                <a>Meet the team</a>
              </Link>
            </li>
            <li>
              <Link href='/branding'>
                <a>Our branding</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a>Contact us</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <h4 className='mb-3'>Projects</h4>
          <ul className='list-unstyled m-md-0'>
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
          <ul className='list-unstyled m-0'>
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
  </footer>
)

export default withTheme(Footer)
