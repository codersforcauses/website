/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Container, Row, Col } from 'reactstrap'
import Title from '../../Utils/Title'
import { styles } from './styles'

const Map = dynamic(() => import('../Map'), { ssr: false })

const FindUsPage = (props: { theme: Object }) => (
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
    <Title typed>./find us</Title>
    <div className='relative-container py-5'>
      <Container className='py-5 bg-secondary rounded-0 d-md-flex text'>
        <Row>
          <Col xs={12} md={6}>
            <h2 className='header'>We are here</h2>
            <p className='lead m-lg-0'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              quod odit magni blanditiis necessitatibus iure, explicabo possimus
              natus deleniti assumenda quas perferendis voluptates quasi numquam
              error laboriosam autem doloribus voluptatibus.Reiciendis, quis
              fuga fugit rerum maxime esse porro sequi sed, ipsa harum
              explicabo! Ex officia quam facilis cum provident consequatur
              perspiciatis rerum, labore ducimus deleniti, eius eveniet
              explicabo pariatur voluptatem!
            </p>
          </Col>
          <div className='map'>
            <Map />
          </div>
        </Row>
      </Container>
    </div>
  </div>
)

export default withTheme(FindUsPage)
