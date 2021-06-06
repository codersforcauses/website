import { useCallback, useState } from 'react'
import Link from 'next/link'
import { Collapse, Toast, ToastBody } from 'reactstrap'
import constants from 'data/constants.json'
import TypedText from 'components/Utils/TypedText'
import Clients from 'components/Utils/Clients'
import Services from '../Services'
import Face from '../Face'
import ContactForm from '../ContactForm'

const HomePage = () => {
  const [contactOpen, setContactOpen] = useState(false)
  const [loadContact, setLoadContact] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

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
        isOpen={!!toastMessage}
        className={`toast m-0 rounded-0 text-white bg-${toastMessage?.status}`}
      >
        <ToastBody>{toastMessage?.message}</ToastBody>
      </Toast>
      <div
        className='flex items-center text-secondary bg-primary text-mono hero'
        // className='hero bg-primary text-secondary d-flex align-items-center rounded-0 text-monospace'
      >
        <div className='container px-3 mx-auto'>
          <h1 className='font-mono text-3xl font-black leading-snug'>
            <TypedText
              text={[
                './Innovation with a mission',
                './Programming with purpose',
                './Do good. ^200Write code',
                './Made with code',
                './Made with ^500❤',
                '#include git.c',
                'class Coders extends Causes',
                'sudo rm -rf /'
              ]}
            />
          </h1>
        </div>
      </div>
      <div className='dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 py-12 mx-auto md:py-24'>
          <h2 className='mb-4 font-mono text-3xl font-bold'>
            We are developers.
          </h2>
          <p className='mb-6 text-lg'>
            Coders for Causes are a group of developers that empower charities
            and non-profit organisations by providing them solutions to their
            technical problems. We are student powered and all of our members
            are volunteers dedicated to providing you the best results.
          </p>
          <Link href='#_contact_us' passHref>
            <a className='px-4 py-2 text-xl font-bold border bg-primary text-secondary border-primary hover:opacity-75 focus:outline-none focus:ring-inset focus:ring focus:ring-accent dark:bg-transparent dark:border-secondary dark:hover:opacity-100 dark:hover:bg-secondary dark:hover:text-primary dark:focus:bg-secondary dark:focus:text-primary'>
              Work with us&nbsp;&nbsp;&raquo;
            </a>
          </Link>
        </div>
      </div>
      <div className='py-12 bg-alt-light dark:bg-primary'>
        <div className='container px-3 mx-auto'>
          <Clients />
        </div>
      </div>
      <div className='py-12 md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <Services />
        </div>
      </div>
      <div className='pt-12 md:pt-24 bg-primary text-secondary'>
        <div id='_contact_us' className='container flex px-3 mx-auto'>
          <div className='flex flex-col justify-center flex-grow'>
            <span
              className={`font-mono text-7xl mt-0 ${
                contactOpen ? 'mb-0' : 'mb-4'
              }`}
            >
              Let's talk.
            </span>
            <Collapse isOpen={!contactOpen}>
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
                className='px-4 py-2 mt-4 text-lg bg-transparent border border-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:bg-secondary focus:text-primary'
                onClick={toggleContactOn}
              >
                Contact us
              </button>
            </Collapse>
            <Collapse isOpen={contactOpen}>
              <ContactForm
                loading={loadContact}
                handleCloseForm={toggleContactOff}
                handleSubmit={handleContactSubmit}
              />
            </Collapse>
          </div>
          <div className='flex-row-reverse hidden md:flex'>
            <Face />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
