/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useState, useCallback } from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import BrandIcons from 'components/Elements/BrandIcons'
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
  const openMembership = useCallback(
    () => newTab('https://docs.google.com/forms/d/e/1FAIpQLScPEsHxs1afKNF7Zo9i7JkDgGlg3k-nZowJspsb18ve1odkaA/viewform'),
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
            <Image
              src='/logo/cfc_logo_white_full.svg'
              alt='Coders for Causes wordmark'
              layout='responsive'
              width='75%'
              height='25%'
              className='pr-5 pb-3 user-select-none'
            />
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
                  <Button color='link' className='text-secondary p-0 rounded-0'>
                    What we do
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/about#_meet_the_team'>
                  <Button color='link' className='text-secondary p-0 rounded-0'>
                    Meet the team
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/branding'>
                  <Button
                    color='link'
                    className='text-secondary p-0 rounded-0'
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
                    className='text-secondary p-0 rounded-0'
                    data-cy='contact'
                  >
                    Contact us
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                color='link'
                className='text-secondary p-0 rounded-0'
                onClick={openMembership}
                >
                  Join us
                </Button>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <p className='mb-3 text-larger text-monospace'>Projects</p>
            <ul className='list-unstyled m-md-0'>
              <li>
                <Link href='/projects'>
                  <Button color='link' className='text-secondary p-0 rounded-0'>
                    Our services
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/projects'>
                  <Button
                    color='link'
                    className='text-secondary p-0 rounded-0'
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
                    className='text-secondary p-0 rounded-0'
                    data-cy='faq'
                  >
                    FAQ
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
                  <Button color='link' className='text-secondary p-0 rounded-0'>
                    Upcoming events
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='/events?past'>
                  <Button color='link' className='text-secondary p-0 rounded-0'>
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
                className='text-secondary rounded-0 px-0 mx-2'
                onClick={openTermsModal}
              >
                Terms
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary rounded-0 px-0 mx-2'
                onClick={openPrivacyModal}
              >
                Privacy
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary rounded-0 px-0 mx-2'
                onClick={openSecurityModal}
              >
                Security
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary rounded-0 px-0 mx-2'
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
                className='text-secondary p-0 rounded-0 mx-2'
                onClick={openGithub}
              >
                <BrandIcons icon='github' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 rounded-0 mx-2'
                onClick={openDiscord}
              >
                <BrandIcons icon='discord' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 rounded-0 mx-2'
                onClick={openFB}
              >
                <BrandIcons icon='facebook' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 rounded-0 mx-2'
                onClick={openLinkedIn}
              >
                <BrandIcons icon='linkedin' dimensions={20} fill='secondary' />
              </Button>
              <Button
                size='sm'
                color='link'
                className='text-secondary p-0 rounded-0 mx-2'
                onClick={openTwitter}
              >
                <BrandIcons icon='twitter' dimensions={20} fill='secondary' />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
