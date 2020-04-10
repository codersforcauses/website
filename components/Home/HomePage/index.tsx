/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap'
import Clients from '../../Utils/Clients'
import Services from '../Services'
import TypedText from '../../Utils/TypedText'
import Face from '../Face'
import constants from '../../../data/constants.json'
import { styles } from './styles'

const HomePage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Jumbotron className='hero bg-dark text-white d-flex align-items-center rounded-0 monospace'>
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
    <Container className='py-5 my-5'>
      <h2 className='font-weight-bold mb-4'>We are a charity.</h2>
      <p className='lead'>
        Coders for Causes is a non for profit organisation that empowers
        charities and other non for profit organisations by connecting them with
        university students to develop technical solutions. We are students
        powered and all of our members are volunteers.
      </p>
      <Button outline color='primary' className='rounded-0'>
        Work with us&nbsp;&nbsp;&nbsp;>
      </Button>
    </Container>
    <div className='bg-light'>
      <Container className='py-5'>
        <Clients />
      </Container>
    </div>
    <Container className='py-5 my-5'>
      <Services />
    </Container>
    <div className='py-5 bg-dark text-white'>
      <Container className='py-5'>
        <Row>
          <Col md={8}>
            <h1 className='display-3 mb-3'>Let's talk.</h1>
            <a
              href={`mailto:${constants.email}`}
              target='_blank'
              rel='noreferrer noopener'
              className='text-white'
            >
              <h3 className='email'>{constants.email}</h3>
            </a>
          </Col>
          <Col sm={4} className='d-none d-md-flex flex-row-reverse'>
            <Face />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
)

export default withTheme(HomePage)
