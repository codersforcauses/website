import { useTheme } from 'emotion-theming'
import { useState, useContext } from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'

const EventPage = () => {
  const [isPaid, setIsPaid] = useState(true)
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  return (
    <div css={styles(theme, isDark)}>
      <div className='bg-primary mt-5 py-5 bg text-secondary text-monospace'>
        <Container className='mt-5 pt-5'>
          <h5 className='my-5'>./Workshop</h5>
          <h1 className='display-4 m-0 event-main-head'>
            Essential Software Industry Skills
          </h1>
        </Container>
      </div>
      <Container className='my-5'>
        <Row className='mb-5 pb-5'>
          <Col
            xs={12}
            md={6}
            lg={5}
            tag='img'
            src='https://source.unsplash.com/random'
            className='mb-4 mb-md-0 img-fluid'
          />
          <Col xs={12} md={6} lg={{ size: 6, offset: 1 }}>
            <p className='m-0'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
              tempore quia deserunt praesentium maiores optio blanditiis
              voluptas labore repellat, excepturi, quidem aliquid eum soluta
              unde ipsum repellendus molestias consectetur eligendi! Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Eius, reiciendis a
              adipisci sequi placeat porro eum laborum ipsum voluptatum
              excepturi aliquid cum, commodi rem ad repudiandae! Possimus,
              facilis minima. Tempore!
            </p>
            {isPaid && (
              <Button
                color={isDark ? 'secondary' : 'primary'}
                outline={isDark}
                className='rounded-0 mt-3'
              >
                Buy tickets &raquo;
              </Button>
            )}
          </Col>
        </Row>
        <Row className='mb-5 pb-5'>
          <Col sm={4}>
            <h5 className='font-weight-bold'>What to bring</h5>
            <ol className='pl-3'>
              <li>Your enthusiasm</li>
              <li>Your laptop</li>
            </ol>
          </Col>
          <Col sm={4}>
            <h5 className='font-weight-bold'>Where</h5>
            <div>
              The Circle (Reid Library) <br /> UWA Crawley Campus
            </div>
          </Col>
          <Col sm={4}>
            <h5 className='font-weight-bold'>When</h5>
            <div>
              Tuesday 18th March <br /> 3:30pm - 4:30pm
            </div>
          </Col>
        </Row>
        <Row noGutters className='text-secondary text-monospace'>
          <Col
            md={3}
            className='bg-primary px-5 pt-5 pb-md-5 d-flex align-items-center justify-content-center'
          >
            <i className='material-icons-sharp md-xl'>
              {isPaid ? 'attach_money' : 'money_off'}
            </i>
          </Col>
          <Col
            md={9}
            className='bg-primary d-flex align-items-center p-5 pt-3 pt-md-5 workshop-border'
          >
            <div className='px-lg-5'>
              <h5 className='font-weight-bold mb-3'>
                {isPaid
                  ? 'This event is paid'
                  : 'Our workshops are always free!'}
              </h5>
              <p className='text m-0'>
                {isPaid
                  ? 'As part of our commitment to empower students for a successful career in the software industry, Coders for Causes host this event to supercharge your career.'
                  : 'As part of our commitment to empower students for a successful career in the software industry, Coders for Causes host free workshops covering a variety of topics to supercharge your career.'}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EventPage
