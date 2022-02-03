import { useCallback, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Toast from '@elements/Toast'
import TypedText from '@components/Utils/TypedText'
import Services from '../Services'
import Face from '../Face'
import ClientSlider from './ClientSlider'
const ContactForm = dynamic(() => import('../ContactForm'))

const constants = {
  email: 'hello@codersforcauses.org'
}

const HomePage = () => {
  const [contactOpen, setContactOpen] = useState(false)
  const [loadContact, setLoadContact] = useState(false)
  const [toastMessage, setToastMessage] = useState<ToastProps | null>(null)

  const handleClose = useCallback(() => setToastMessage(null), [])

  const toggleContactOn = useCallback(() => setContactOpen(true), [])
  const toggleContactOff = useCallback(() => setContactOpen(false), [])
  const handleContactSubmit = useCallback(async values => {
    try {
      setLoadContact(true)
      const response = await fetch('https://formspree.io/mrgyryzj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(values)
      })
      if ((await response.status) === 200) {
        setContactOpen(false)
        setToastMessage({
          status: 'success',
          message:
            'Your query has been submitted to us, we will get back to you as soon as we can.'
        })
      }
    } catch (error) {
      setToastMessage({
        status: 'danger',
        message: 'Your message was unable to be sent, please try again'
      })
    } finally {
      setLoadContact(false)
      setTimeout(() => {
        setToastMessage(null)
      }, 6000)
    }
  }, [])

  return (
    <>
      <Toast
        open={!!toastMessage?.status}
        type={toastMessage?.status}
        onClose={handleClose}
      >
        {toastMessage?.message}
      </Toast>
      <div className='py-12 md:py-36 text-secondary bg-primary'>
        <div className='container grid px-3 mx-auto md:grid-cols-2 md:gap-x-20'>
          <div className='flex flex-col'>
            <h1 className='mb-4 font-mono text-4xl font-black'>
              We are developers.
            </h1>
            <p className='pb-6 text-lg'>
              Coders for Causes are a group of developers that empower charities
              and non-profit organisations by providing them solutions to their
              technical problems. We are student powered and all of our members
              are volunteers dedicated to providing you the best results.
            </p>
            <div className='flex'>
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLScPEsHxs1afKNF7Zo9i7JkDgGlg3k-nZowJspsb18ve1odkaA/viewform'
                target='_blank'
                rel='noreferrer noopener'
                className='px-4 py-2 mr-4 text-xl font-black border border-secondary bg-secondary text-primary hover:bg-secondary/75 focus:outline-none focus:ring-inset focus:ring focus:ring-accent'
              >
                Join Us
              </a>
              <Link href='#_contact_us'>
                <a className='px-4 py-2 text-xl font-black bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:ring-opacity-0 focus:bg-secondary focus:text-primary'>
                  Work with us&nbsp;&nbsp;&raquo;
                </a>
              </Link>
            </div>
          </div>
          <div className='hidden h-full p-4 border select-none md:block'>
            <p className='font-mono text-lg font-black leading-snug'>
              <span className='mr-4 text-accent'>$</span>
              <TypedText
                text={[
                  'echo "./Innovation with a mission"',
                  'Programming with purpose',
                  'Do good. ^200Write code',
                  'Made with code',
                  'Made with ^500❤',
                  '#include git.c',
                  'yarn add codersforcauses',
                  'sudo rm -rf /'
                ]}
              />
            </p>
          </div>
        </div>
      </div>
      <div className='w-screen py-12 bg-alt-light dark:bg-primary'>
        <ClientSlider />
      </div>
      <div className='py-12 md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <Services />
        </div>
      </div>
      <div className='py-12 md:py-24 bg-primary text-secondary'>
        <div id='_contact_us' className='container flex px-3 mx-auto space-x-4'>
          <div className='flex flex-col justify-center flex-grow'>
            <span
              className={`font-mono text-7xl mt-0 ${
                contactOpen ? 'mb-0' : 'mb-4'
              }`}
            >
              Let&apos;s talk.
            </span>
            {contactOpen ? (
              <ContactForm
                loading={loadContact}
                handleCloseForm={toggleContactOff}
                handleSubmit={handleContactSubmit}
              />
            ) : (
              <>
                <div>
                  <a
                    href={`mailto:${constants.email}`}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='font-mono text-xl md:text-3xl text-secondary hover:underline focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
                  >
                    {constants.email}
                  </a>
                </div>
                <button
                  className='px-4 py-2 mt-4 text-lg bg-transparent border max-w-max border-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:bg-secondary focus:text-primary'
                  onClick={toggleContactOn}
                >
                  Contact us
                </button>
              </>
            )}
          </div>
          <div className='hidden md:flex-row-reverse md:flex'>
            <Face />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

interface ToastProps {
  status: 'success' | 'danger'
  message: string
}
