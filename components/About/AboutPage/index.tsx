/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext } from 'react'
import { Container, Jumbotron, Row, Col } from 'reactstrap'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Title from 'components/Utils/Title'
import { DarkContext } from 'helpers/user'
import Committee from '../Committee'
import Clients from '../../Utils/Clients'
import Partners from '../Partners'
// import SpecialThanks from '../SpecialThanks'
import Sponsors from '../Sponsors'
import { styles } from './styles'

const Map = dynamic(() => import('../Map'), { ssr: false })

const AboutPage = () => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()
  return (
    <div css={styles(theme, isDark)}>
      <Head>
        <link
          href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css'
          rel='stylesheet'
        />
      </Head>

      <Title typed>./about</Title>
      <div className='relative-container py-5'>
        <Container id='_what_we_do' className='py-5 rounded-0 d-md-flex'>
          <Row className='d-flex align-items-center'>
            <Col xs={12} lg={6} className='pr-lg-5'>
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
          </Row>
        </Container>
        <div className='map'>
          <Map />
        </div>
      </div>

      <Jumbotron id='_meet_the_team' className='m-0 p-0 secondary-bg'>
        <Container className='rounded-0 py-5'>
          <h3 className='m-0'>Meet the Team</h3>
          <Committee />
        </Container>
      </Jumbotron>

      <Container className='my-5 py-2'>
        <h3 className='header m-0'>Our Clients</h3>
        <div className='py-5'>
          <Clients />
        </div>
        <h3 className='header m-0'>Our Sponsors</h3>
        <div className='py-5'>
          <Sponsors />
        </div>
        <h3 className='header m-0'>Our Partnered Clubs</h3>
        <div className='pt-5'>
          <Partners />
        </div>
        {/* <h3 className='header m-0'>Special Thanks</h3>
        <div className='pt-5'>
          <SpecialThanks />
        </div> */}
      </Container>
    </div>
  )
}

export default AboutPage
