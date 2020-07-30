/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState } from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import SocialIcons from 'components/Elements/SocialIcons'
import { styles } from './styles'

const TermsModal = dynamic(() => import('./TermsModal'))
const PrivacyModal = dynamic(() => import('./PrivacyModal'))
const SecurityModal = dynamic(() => import('./SecurityModal'))
const ConstitutionModal = dynamic(() => import('./ConstitutionModal'))

const Footer = () => {
  const [termsModal, setTermsModal] = useState(false)
  const [privacyModal, setPrivacyModal] = useState(false)
  const [securityModal, setSecurityModal] = useState(false)
  const [constitutionModal, setConstitutionModal] = useState(false)
  const theme = useTheme()

  const newTab = url => window.open(url, '_blank')

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
                  <Button color='link' className='text-secondary p-0'>
                    Past events
                  </Button>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12} md={7} className='d-md-flex align-items-center'>
            <p className='my-0 mr-3 mr-lg-4 monospace copyright'>
              &copy; {new Date().getFullYear()} Coders for Causes
            </p>
            <div className='d-flex align-items-center justify-content-between legal'>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={() => setTermsModal(true)}
              >
                Terms
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={() => setPrivacyModal(true)}
              >
                Privacy
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={() => setSecurityModal(true)}
              >
                Security
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={() => setConstitutionModal(true)}
              >
                Constitution
              </Button>
            </div>
            <TermsModal
              isOpen={termsModal}
              closeModal={() => setTermsModal(false)}
            />
            <PrivacyModal
              isOpen={privacyModal}
              closeModal={() => setPrivacyModal(false)}
            />
            <SecurityModal
              isOpen={securityModal}
              closeModal={() => setSecurityModal(false)}
            />
            <ConstitutionModal
              isOpen={constitutionModal}
              closeModal={() => setConstitutionModal(false)}
            />
          </Col>
          <Col xs={12} md={5} className='d-md-flex flex-row-reverse'>
            <div className='d-flex align-items-center justify-content-between flex-grow-1 social'>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={() => newTab('https://github.com/codersforcauses')}
              >
                <SocialIcons icon='github' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={() => newTab('https://discord.com/invite/zW3hjwY')}
              >
                <SocialIcons icon='discord' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={() =>
                  newTab('https://www.facebook.com/codersforcauses')}
              >
                <SocialIcons icon='facebook' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={() =>
                  newTab('https://www.linkedin.com/company/coders-for-causes/')}
              >
                <SocialIcons icon='linkedin' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={() => newTab('https://twitter.com/codersforcauses')}
              >
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
