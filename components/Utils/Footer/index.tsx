/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import { styles } from './styles'

const Footer = (props: { theme: Object }) => (
  <footer
    className='bg-primary text-secondary py-5 footer'
    css={styles(props.theme)}
    data-cy='footer'
  >
    <Container>
      <Row>
        <Col
          md={3}
          className='mb-3 mb-md-0 d-flex flex-column justify-content-between'
        >
          <div>
            <img
              src='/logo/cfc_logo_white_full.svg'
              alt='Coders for Causes wordmark'
              className='img-fluid w-75 mb-1'
            />
            <p className='mb-1 monospace copyright' data-cy='copyrightnotice'>
              Copyright &copy; {new Date().getFullYear()} Coders for Causes
            </p>
          </div>
          <p className='monospace m-0'>
            <small>Made with &#10084;</small>
          </p>
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
                <a data-cy='branding'>Our branding</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a data-cy='contact'>Contact us</a>
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
                <a data-cy='projects'>Previous projects</a>
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
