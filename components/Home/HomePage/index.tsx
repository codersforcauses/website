/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Jumbotron,
  Button,
  Collapse,
  Container,
  Row,
  Col,
  Toast,
  ToastBody
} from 'reactstrap'
import constants from 'data/constants.json'
import TypedText from 'components/Utils/TypedText'
import Clients from 'components/Utils/Clients'
import Services from '../Services'
import Face from '../Face'
import { styles } from './styles'
import ContactForm from '../ContactForm'

const HomePage = () => {
  const [contactOpen, setContactOpen] = useState(false)
  const [loadContact, setLoadContact] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const theme = useTheme()

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
    <div css={styles(theme)}>
      <Toast
        isOpen={!!toastMessage}
        className={`toast m-0 rounded-0 text-white bg-${toastMessage?.status}`}
      >
        <ToastBody>{toastMessage?.message}</ToastBody>
      </Toast>
      <Jumbotron className='hero bg-primary text-secondary d-flex align-items-center rounded-0 text-monospace'>
        <Container>
          <h1 className='mb-4'>
            <TypedText
              text={[
                './Innovation with a mission',
                './Programming with purpose',
                './Do good. ^200Write code',
                './Made with code',
                './Made with ^500❤️',
                '#include git.c',
                'class Coders extends Causes',
                'sudo rm -rf /'
              ]}
            />
          </h1>
        </Container>
      </Jumbotron>
      <Container className='py-5 my-md-5'>
        <h2 className='font-weight-bold mb-4'>We are developers.</h2>
        <p className='lead'>
          Coders for Causes are a group of developers that empower charities and
          non-profit organisations by providing them solutions to their
          technical problems. We are student powered and all of our members are
          volunteers dedicated to providing you the best results.
        </p>
        <Link href='#_contact_us'>
          <Button size='lg' color='primary' className='rounded-0'>
            Work with us&nbsp;&nbsp;&raquo;
          </Button>
        </Link>
      </Container>
      <div className='bg-light'>
        <Container>
          <Clients />
        </Container>
      </div>
      <Container className='py-5 my-md-5'>
        <Services />
      </Container>
      <div className='pt-5 pb-md-5 bg-primary text-secondary'>
        <Container id='_contact_us' className='pt-md-5 pb-0 pb-md-5'>
          <Row className='mt-lg-5'>
            <Col md={8} className='d-flex flex-column justify-content-center'>
              <h1 className={`display-3 mt-0 mb-${contactOpen ? '0' : '3'}`}>
                Let's talk.
              </h1>
              <Collapse isOpen={!contactOpen}>
                <div>
                  <a
                    href={`mailto:${constants.email}`}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='text-secondary email text-monospace'
                  >
                    {constants.email}
                  </a>
                </div>
                <Button
                  outline
                  size='lg'
                  color='secondary'
                  className='rounded-0 mt-4'
                  onClick={toggleContactOn}
                >
                  Contact us
                </Button>
              </Collapse>
            </Col>
            <Col sm={4} className='d-none d-md-flex flex-row-reverse'>
              <Face />
            </Col>
            <Col md={8}>
              <Collapse isOpen={contactOpen}>
                <ContactForm
                  loading={loadContact}
                  handleCloseForm={toggleContactOff}
                  handleSubmit={handleContactSubmit}
                />
              </Collapse>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default HomePage
