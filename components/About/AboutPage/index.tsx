/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Container, Jumbotron, Row, Col } from 'reactstrap'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Title from '../../Utils/Title'
import Committee from '../Committee'
import Clients from '../../Utils/Clients'
import Partners from '../Partners'
import SpecialThanks from '../SpecialThanks'
import Sponsors from '../Sponsors'
import { styles } from './styles'

const Map = dynamic(() => import('../Map'), { ssr: false })

const AboutPage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Head>
      <script
        async
        defer
        src='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'
      />
      <link
        href='https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css'
        rel='stylesheet'
      />
    </Head>

    <Title typed>./about</Title>
    <div className='relative-container py-5'>
      <Container
        id='_what_we_do'
        className='py-5 bg-secondary rounded-0 d-md-flex'
      >
        <Row className='d-flex align-items-center'>
          <Col xs={12} lg={5}>
            <h2 className='header'>We build software for charities</h2>
            <p className='lead m-lg-0'>
              Coders for Causes is a not for profit organisation that empowers
              charities and other not for profit organisations by connecting
              them with university students to develop technical solutions. We
              are a student-run club based in Perth, Western Australia with a
              wide range of clients. Whether you are looking for technical
              advice or a long term project, get in touch with us for more
              information.
            </p>
          </Col>
          <div className='map'>
            <Map />
          </div>
        </Row>
      </Container>
    </div>

    <Jumbotron id='_meet_the_team' className='m-0 p-0'>
      <Container className='rounded-0 py-5'>
        <h3 className='m-0'>Meet the Team</h3>
        <Committee />
      </Container>
    </Jumbotron>

    <Container className='my-5'>
      <Row>
        <Col xs={12} tag='h3' className='header m-0'>
          Our Clients
        </Col>
      </Row>
      <Clients />
      <Row>
        <Col xs={12} tag='h3' className='header m-0'>
          Our Sponsors
        </Col>
      </Row>
      <Sponsors />
      <Row>
        <Col xs={12} tag='h3' className='header m-0'>
          Our Partnered Clubs
        </Col>
      </Row>
      <Partners />
      <Row>
        <Col xs={12} tag='h3' className='header m-0'>
          Special Thanks
        </Col>
      </Row>
      <SpecialThanks />
    </Container>
  </div>
)

export default withTheme(AboutPage)
