import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import BrandIcons from '@components/Elements/BrandIcons'

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
            <div className='relative w-1/2 h-12 select-none md:w-5/6'>
              <Image
                src='/logo/cfc_logo_white_full.svg'
                alt='Coders for Causes wordmark'
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
              <p className='mb-4 font-mono text-2xl'>Legal</p>
              <ul>
                <li>
                  <button
                    className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                    onClick={openConstitutionModal}
                  >
                    Constitution
                  </button>
                </li>
                <li>
                  <button
                    className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                    onClick={openTermsModal}
                  >
                    Terms
                  </button>
                </li>
                <li>
                  <button
                    className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                    onClick={openPrivacyModal}
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                    onClick={openSecurityModal}
                  >
                    Security
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <p className='mb-4 font-mono text-2xl'>About us</p>
              <ul className='m-0'>
                <li>
                  <Link href='/about#_what_we_do'>
                    <a className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'>
                      What we do
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/about#_meet_the_team'>
                    <a className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'>
                      Meet the team
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/branding'>
                    <a
                      className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                      data-cy='branding'
                    >
                      Our branding
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/#_contact_us'>
                    <a
                      className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                      data-cy='contact'
                    >
                      Contact us
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className='mb-4 font-mono text-2xl'>Projects</p>
              <ul>
                <li>
                  <Link href='/projects'>
                    <a className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'>
                      Our services
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/projects'>
                    <a
                      className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                      data-cy='projects'
                    >
                      Previous projects
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/faq'>
                    <a
                      className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                      data-cy='faq'
                    >
                      FAQ
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className='mb-4 font-mono text-2xl'>Events</p>
              <ul>
                <li>
                  <Link href='/events?upcoming'>
                    <a className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'>
                      Upcoming
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/events?past'>
                    <a className='text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'>
                      Past events
                    </a>
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
              className='p-1 text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
            >
              <BrandIcons
                icon='github'
                dimensions={20}
                className='fill-current'
              />
            </a>
            <a
              href='https://discord.com/invite/zW3hjwY'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
            >
              <BrandIcons
                icon='discord'
                dimensions={20}
                className='fill-current'
              />
            </a>
            <a
              href='https://www.facebook.com/codersforcauses'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
            >
              <BrandIcons
                icon='facebook'
                dimensions={20}
                className='fill-current'
              />
            </a>
            <a
              href='https://www.linkedin.com/company/coders-for-causes/'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
            >
              <BrandIcons
                icon='linkedin'
                dimensions={20}
                className='fill-current'
              />
            </a>
            <a
              href='https://twitter.com/codersforcauses'
              target='_blank'
              rel='noreferrer noopener'
              className='p-1 text-secondary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
            >
              <BrandIcons
                icon='twitter'
                dimensions={20}
                className='fill-current'
              />
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
