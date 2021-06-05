import { useState, useCallback } from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import BrandIcons from 'components/Elements/BrandIcons'

const TermsModal = dynamic(() => import('./TermsModal'))
const PrivacyModal = dynamic(() => import('./PrivacyModal'))
const SecurityModal = dynamic(() => import('./SecurityModal'))
const ConstitutionModal = dynamic(() => import('./ConstitutionModal'))

const Footer = () => {
  const [termsModal, setTermsModal] = useState(false)
  const [privacyModal, setPrivacyModal] = useState(false)
  const [securityModal, setSecurityModal] = useState(false)
  const [constitutionModal, setConstitutionModal] = useState(false)

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
    <footer className='pt-6 pb-3 bg-primary text-secondary' data-cy='footer'>
      <div className='container px-3 mx-auto'>
        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-col justify-between mb-3 mr-3 md:mb-0'>
            <div className='relative w-5/6 h-16 select-none'>
              <Image
                src='/logo/cfc_logo_white_full.svg'
                alt='Coders for Causes wordmark'
                sizes='100%'
                layout='fill'
              />
            </div>
            <p className='m-0 font-mono'>
              <small>Made with &#10084;</small>
              <small className='text-primary'> by Jeremiah</small>
            </p>
          </div>
          <div className='grid flex-grow grid-cols-2 gap-6 md:grid-cols-4'>
            <div>
              <p className='mb-3 font-mono text-2xl'>Legal</p>
              <ul>
                <li>
                  <Button
                    size='sm'
                    color='link'
                    className='px-0 text-secondary rounded-0'
                    onClick={openConstitutionModal}
                  >
                    Constitution
                  </Button>
                </li>
                <li>
                  <Button
                    size='sm'
                    color='link'
                    className='px-0 text-secondary rounded-0'
                    onClick={openTermsModal}
                  >
                    Terms
                  </Button>
                </li>
                <li>
                  <Button
                    size='sm'
                    color='link'
                    className='px-0 text-secondary rounded-0'
                    onClick={openPrivacyModal}
                  >
                    Privacy
                  </Button>
                </li>
                <li>
                  <Button
                    size='sm'
                    color='link'
                    className='px-0 text-secondary rounded-0'
                    onClick={openSecurityModal}
                  >
                    Security
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <p className='mb-3 font-mono text-2xl'>About us</p>
              <ul className='m-0'>
                <li>
                  <Link href='/about#_what_we_do'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
                    >
                      What we do
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href='/about#_meet_the_team'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
                    >
                      Meet the team
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href='/branding'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
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
                      className='p-0 text-secondary rounded-0'
                      data-cy='contact'
                    >
                      Contact us
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className='mb-3 font-mono text-2xl'>Projects</p>
              <ul>
                <li>
                  <Link href='/projects'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
                    >
                      Our services
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href='/projects'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
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
                      className='p-0 text-secondary rounded-0'
                      data-cy='faq'
                    >
                      FAQ
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className='mb-3 font-mono text-2xl'>Events</p>
              <ul>
                <li>
                  <Link href='/events?upcoming'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
                    >
                      Upcoming
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href='/events?past'>
                    <Button
                      color='link'
                      className='p-0 text-secondary rounded-0'
                    >
                      Past events
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-5 space-y-3 md:flex-row md:space-y-0 md:items-center md:justify-between md:space-x-3'>
          <p className='font-mono text-xs md:m-0' data-cy='copyrightnotice'>
            &copy; {new Date().getFullYear()} Coders for Causes
          </p>
          <div className='flex items-center justify-between space-x-3 md:w-48'>
            <a
              href='https://github.com/codersforcauses'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary'
            >
              <BrandIcons icon='github' dimensions={20} fill='secondary' />
            </a>
            <a
              href='https://discord.com/invite/zW3hjwY'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary'
            >
              <BrandIcons icon='discord' dimensions={20} fill='secondary' />
            </a>
            <a
              href='https://www.facebook.com/codersforcauses'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary'
            >
              <BrandIcons icon='facebook' dimensions={20} fill='secondary' />
            </a>
            <a
              href='https://www.linkedin.com/company/coders-for-causes/'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary'
            >
              <BrandIcons icon='linkedin' dimensions={20} fill='secondary' />
            </a>
            <a
              href='https://twitter.com/codersforcauses'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary'
            >
              <BrandIcons icon='twitter' dimensions={20} fill='secondary' />
            </a>
          </div>
        </div>
      </div>
      <TermsModal isOpen={termsModal} closeModal={closeTermsModal} />
      <PrivacyModal isOpen={privacyModal} closeModal={closePrivacyModal} />
      <SecurityModal isOpen={securityModal} closeModal={closeSecurityModal} />
      <ConstitutionModal
        isOpen={constitutionModal}
        closeModal={closeConstitutionModal}
      />
    </footer>
  )
}

export default Footer
