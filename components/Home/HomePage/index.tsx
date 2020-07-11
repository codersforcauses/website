/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState } from 'react'
import { Jumbotron, Button, Collapse, Container, Row, Col } from 'reactstrap'
import constants from 'data/constants.json'
import TypedText from 'components/Utils/TypedText'
import Clients from 'components/Utils/Clients'
import Services from '../Services'
import Face from '../Face'
import { styles } from './styles'
import ContactForm from '../ContactForm'
import Link from 'next/link'

const HomePage = () => {
  const [contactOpen, setContactOpen] = useState(false)

  const theme = useTheme()

  return (
    <div css={styles(theme)}>
      <Jumbotron className='hero bg-primary text-secondary d-flex align-items-center rounded-0 monospace'>
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
      <div className='py-5 bg-primary text-secondary'>
        <Container id='_contact_us' className='pt-5 pb-0 pb-md-5'>
          <Row className='mt-lg-5'>
            <Col md={8} className='d-flex flex-column justify-content-center'>
              <h1 className={`display-3 mt-0 mb-${contactOpen ? '0' : '3'}`}>
                Let's talk.
              </h1>
              <Collapse isOpen={!contactOpen}>
                <a
                  href={`mailto:${constants.email}`}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='text-secondary'
                >
                  <h3 className='email'>{constants.email}</h3>
                </a>
                <Button
                  outline
                  size='lg'
                  color='secondary'
                  className='rounded-0 mt-4'
                  onClick={() => setContactOpen(true)}
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
                <ContactForm handleCloseForm={() => setContactOpen(false)} />
              </Collapse>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default HomePage
