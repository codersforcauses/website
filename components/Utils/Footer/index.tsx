/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Button, Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import { styles } from './styles'
import SocialIcons from 'components/Elements/SocialIcons'

const Footer = () => {
  const theme = useTheme()

  return (
    <footer
      className='bg-primary text-secondary pt-5 pb-2 footer'
      css={styles(theme)}
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
                  <Button color='link' className='text-secondary p-0'>
                    What we do
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/about#_meet_the_team'>
                  <Button color='link' className='text-secondary p-0'>
                    Meet the team
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/branding'>
                  <Button color='link' className='text-secondary p-0'>
                    Our branding
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/#_contact_us'>
                  <Button color='link' className='text-secondary p-0'>
                    Contact us
                  </Button>
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h4 className='mb-3'>Projects</h4>
            <ul className='list-unstyled m-md-0'>
              <li>
                <Link href='/projects'>
                  <Button color='link' className='text-secondary p-0'>
                    Our services
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/projects'>
                  <Button color='link' className='text-secondary p-0'>
                    Previous projects
                  </Button>
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h4 className='mb-3'>Events</h4>
            <ul className='list-unstyled m-0'>
              <li>
                <Link href='/about'>
                  <Button color='link' className='text-secondary p-0'>
                    Upcoming events
                  </Button>
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
        <Row className='mt-4'>
          <Col xs={12} md={7}>
            <div className='d-flex align-items-center justify-content-between legal'>
              <p className='my-0 mr-3 monospace copyright'>
                &copy; {new Date().getFullYear()} Coders for Causes
              </p>
              <Button size='sm' color='link' className='text-secondary'>Terms</Button>
              <Button size='sm' color='link' className='text-secondary'>Privacy</Button>
              <Button size='sm' color='link' className='text-secondary'>Security</Button>
            </div>
          </Col>
          <Col xs={12} md={5} className='d-md-flex flex-row-reverse'>
            <div className='d-flex align-items-center justify-content-between flex-grow-1 social'>
              <Button size='sm' color='link' className='text-secondary' onClick={() => window.open('https://github.com/codersforcauses', '_blank')}>
                <SocialIcons icon='github' dimensions={20} fill='secondary' />
              </Button>
              <Button size='sm' color='link' className='text-secondary' onClick={() => window.open('https://www.facebook.com/codersforcauses', '_blank')}>
                <SocialIcons icon='facebook' dimensions={20} fill='secondary' />
              </Button>
              <Button size='sm' color='link' className='text-secondary' onClick={() => window.open('https://www.linkedin.com/company/coders-for-causes/', '_blank')}>
                <SocialIcons icon='linkedin' dimensions={20} fill='secondary' />
              </Button>
              <Button size='sm' color='link' className='text-secondary' onClick={() => window.open('https://twitter.com/codersforcauses', '_blank')}>
                <SocialIcons icon='twitter' dimensions={20} fill='secondary' />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
