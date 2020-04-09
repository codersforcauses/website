/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Button, Container, Jumbotron, Row, Col } from 'reactstrap'
import Title from '../../Utils/Title'
import Committee from '../Committee'
import Clients from '../../Utils/Clients'
import Partners from '../Partners'
import SpecialThanks from '../SpecialThanks'
import Sponsors from '../Sponsors'
import { style } from './style'

const AboutPage = (props: { theme: Object }) => (
  <div css={style(props.theme)}>
    <Title typed>./about</Title>
    <Container id='_what_we_do' className='my-5 py-5 bg-white rounded-0'>
      <Row className='d-flex align-items-center'>
        <Col xs={12} lg={7}>
          <h2 className='header'>We build software for charities</h2>
          <p className='lead m-0'>
            Coders for Causes is a not for profit organisation that empowers
            charities and other not for profit organisations by connecting them
            with university students to develop technical solutions. We are a
            student-run club based in Perth, Western Australia with a wide range
            of clients. Whether you are looking for technical advice or a long
            term project, get in touch with us for more information.
          </p>
        </Col>
        <Col lg={{ size: 4, offset: 1 }}>
          <img
            src='/illustrations/pair_programming.svg'
            alt='Coder Coding'
            className='img-fluid'
          />
        </Col>
      </Row>
    </Container>

    <Jumbotron id='_meet_the_team' className='m-0'>
      <Container className='rounded-0'>
        <Row>
          <Col xs={12}>
            <h3 className='header'>Meet the Team</h3>
          </Col>
          <Col xs={12}>
            <Committee />
          </Col>
        </Row>
      </Container>
    </Jumbotron>

    <Jumbotron className='m-0 bg-white'>
      <Container>
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Our Clients</h3>
          </Col>
        </Row>
        <div className='py-5'>
          <Clients />
        </div>
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Our Sponsors</h3>
          </Col>
        </Row>
        <Sponsors />
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Our Partnered Clubs</h3>
          </Col>
        </Row>
        <Partners />
        <Row>
          <Col xs={12}>
            <h3 className='header m-0'>Special Thanks</h3>
          </Col>
        </Row>
        <SpecialThanks />
      </Container>
    </Jumbotron>
  </div>
)

export default withTheme(AboutPage)
