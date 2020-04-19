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
      <h2 className='font-weight-bold mb-4'>We are developers.</h2>
      <p className='lead'>
        Coders for Causes are a group of developers that empower charities and
        non-profit organisations by providing them solutions to their technical
        problems. We are student powered and all of our members are volunteers
        dedicated to providing you the best results.
      </p>
      <Button size='lg' color='primary' className='rounded-0'>
        Work with us&nbsp;&nbsp;&raquo;
      </Button>
    </Container>
    <div className='bg-light'>
      <Container>
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
