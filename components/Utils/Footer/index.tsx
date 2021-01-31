/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useCallback } from 'react'
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

  const newTab = useCallback(url => window.open(url, '_blank'), [])
  const openGithub = useCallback(
    () => newTab('https://github.com/codersforcauses'),
    []
  )
  const openDiscord = useCallback(
    () => newTab('https://discord.com/invite/zW3hjwY'),
    []
  )
  const openFB = useCallback(
    () => newTab('https://www.facebook.com/codersforcauses'),
    []
  )
  const openLinkedIn = useCallback(
    () => newTab('https://www.linkedin.com/company/coders-for-causes/'),
    []
  )
  const openTwitter = useCallback(
    () => newTab('https://twitter.com/codersforcauses'),
    []
  )

  const openTermsModal = useCallback(() => setTermsModal(true), [])
  const closeTermsModal = useCallback(() => setTermsModal(false), [])
  const openPrivacyModal = useCallback(() => setPrivacyModal(true), [])
  const closePrivacyModal = useCallback(() => setPrivacyModal(false), [])
  const openSecurityModal = useCallback(() => setSecurityModal(true), [])
  const closeSecurityModal = useCallback(() => setSecurityModal(false), [])
  const openConstitutionModal = useCallback(
    () => setConstitutionModal(true),
    []
  )
  const closeConstitutionModal = useCallback(
    () => setConstitutionModal(false),
    []
  )

  return (
    <footer
      className='bg-primary text-secondary pt-5 pb-2 footer'
      css={styles(theme)}
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
            </div>
            <p className='text-monospace m-0'>
              <small>Made with &#10084;</small>
              <small className='text-primary'> by Jeremiah</small>
            </p>
          </Col>
          <Col md={3}>
            <p className='mb-3 text-larger text-monospace'>About us</p>
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
                  <Button
                    color='link'
                    className='text-secondary p-0'
                    data-cy='branding'
                  >
                    Our branding
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/#_contact_us'>
                  <Button
                    color='link'
                    className='text-secondary p-0'
                    data-cy='contact'
                  >
                    Contact us
                  </Button>
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <p className='mb-3 text-larger text-monospace'>Projects</p>
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
                  <Button
                    color='link'
                    className='text-secondary p-0'
                    data-cy='projects'
                  >
                    Previous projects
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/faq'>
                  <Button
                    color='link'
                    className='text-secondary p-0'
                    data-cy='faq'
                  >
                    Frequently Asked Questions
                  </Button>
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <p className='mb-3 text-larger text-monospace'>Events</p>
            <ul className='list-unstyled m-0'>
              <li>
                <Link href='/events?upcoming'>
                  <Button color='link' className='text-secondary p-0'>
                    Upcoming events
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/events?past'>
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
            <p
              className='my-0 mr-3 mr-lg-4 text-monospace copyright'
              data-cy='copyrightnotice'
            >
              &copy; {new Date().getFullYear()} Coders for Causes
            </p>
            <div className='d-flex align-items-center justify-content-between legal'>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={openTermsModal}
              >
                Terms
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={openPrivacyModal}
              >
                Privacy
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={openSecurityModal}
              >
                Security
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary px-0 mx-2'
                onClick={openConstitutionModal}
              >
                Constitution
              </Button>
            </div>
            <TermsModal isOpen={termsModal} closeModal={closeTermsModal} />
            <PrivacyModal
              isOpen={privacyModal}
              closeModal={closePrivacyModal}
            />
            <SecurityModal
              isOpen={securityModal}
              closeModal={closeSecurityModal}
            />
            <ConstitutionModal
              isOpen={constitutionModal}
              closeModal={closeConstitutionModal}
            />
          </Col>
          <Col xs={12} md={5} className='d-md-flex flex-row-reverse'>
            <div className='d-flex align-items-center justify-content-between flex-grow-1 social'>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={openGithub}
              >
                <SocialIcons icon='github' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={openDiscord}
              >
                <SocialIcons icon='discord' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={openFB}
              >
                <SocialIcons icon='facebook' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={openLinkedIn}
              >
                <SocialIcons icon='linkedin' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 mx-2'
                onClick={openTwitter}
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
