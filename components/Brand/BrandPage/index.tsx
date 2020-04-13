/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
import { Jumbotron, Container, Row, Col, Card, Input } from 'reactstrap'
import Title from '../../Utils/Title'
import LogoCard from '../LogoCard'
import ColourCard from '../ColourCard'
import { styles } from './styles'

const BrandPage = (props: { theme: Object }) => {
  const [typographyText, setTypographyText] = useState('Coders for Causes')
  return (
    <div css={styles(props.theme)}>
      <Title typed>./branding</Title>
      <Container className='py-5 my-5'>
        <Row>
          <Col xs={12}>
            <h3 className='font-weight-bold'>Our Logo</h3>
            <p>
              Please do not edit, change, distort, recolour, or reconfigure the
              Coders for Causes logo.
            </p>
          </Col>
          <Col xs={6}>
            <LogoCard
              dark
              main
              svg='/logo/cfc_logo_white_full.svg'
              png='/logo/cfc_logo_white_full.png'
            />
          </Col>
          <Col xs={6}>
            <LogoCard
              main
              svg='/logo/cfc_logo_black_full.svg'
              png='/logo/cfc_logo_black_full.png'
            />
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xs={12}>
            <h4 className='font-weight-bold'>Alternate Logos</h4>
            <p>
              If possible, we prefer you use our full logo. If not, we have
              provided alternate logos for you to use.
            </p>
          </Col>
          <Col cs={12}>
            <Row>
              <Col xs={4}>
                <LogoCard
                  dark
                  svg='/logo/cfc_logo_white.svg'
                  png='/logo/cfc_logo_white.png'
                />
              </Col>
              <Col xs={4}>
                <LogoCard
                  dark
                  svg='/logo/cfc_logo_black_square.svg'
                  png='/logo/cfc_logo_black_square.png'
                />
              </Col>
              <Col xs={4}>
                <LogoCard
                  dark
                  svg='/logo/cfc_logo_black_circle.svg'
                  png='/logo/cfc_logo_white_circle.png'
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col xs={4}>
                <LogoCard
                  svg='/logo/cfc_logo_black.svg'
                  png='/logo/cfc_logo_black.png'
                />
              </Col>
              <Col xs={4}>
                <LogoCard
                  svg='/logo/cfc_logo_white_square.svg'
                  png='/logo/cfc_logo_white_square.png'
                />
              </Col>
              <Col xs={4}>
                <LogoCard
                  svg='/logo/cfc_logo_white_circle.svg'
                  png='/logo/cfc_logo_white_circle.png'
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Jumbotron className='m-0 px-0 py-5 rounded-0'>
        <Container>
          <Row className='mb-5'>
            <Col xs={12} tag='h3' className='mb-3 font-weight-bold'>
              Typography
            </Col>
            <Col xs={12} tag='p'>
              You can test our fonts below.
            </Col>
            <Col xs={6} tag='p' className='monospace'>
              <Card
                body
                outline
                color='primary'
                className='bg-transparent rounded-0'
              >
                <strong>IBM Plex Mono</strong>
                {typographyText}
              </Card>
            </Col>
            <Col xs={6} tag='p'>
              <Card
                body
                outline
                color='primary'
                className='bg-transparent rounded-0'
              >
                <strong>IBM Plex Sans</strong>
                {typographyText}
              </Card>
            </Col>
            <Col xs={12} className='mb-3'>
              <Input
                type='textarea'
                size='sm'
                name='typographyText'
                onChange={({ target: { value = typographyText } = {} }) =>
                  setTypographyText(value)}
                value={typographyText}
                className='rounded-0 border border-dark text-dark'
              />
            </Col>
          </Row>

          <Row noGutters>
            <Col xs={12} tag='h3' className='mb-3 font-weight-bold'>
              Our colours
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <ColourCard
                color='primary'
                name='All Black (Primary)'
                className='text-white'
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <ColourCard color='secondary' name='All White (Secondary)' />
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <ColourCard color='accent' name='Electric Teal (Accent)' />
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <ColourCard
                color='success'
                name='Ocean Blue (Success)'
                className='text-white'
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <ColourCard color='warning' name='Signal Yellow (Warning)' />
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <ColourCard
                color='error'
                name='Red Alert (Alert)'
                className='text-white'
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  )
}

export default withTheme(BrandPage)
