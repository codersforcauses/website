import { useState, useCallback } from 'react'
import { Row, Col, Card, CardText, Button } from 'reactstrap'
import Router from 'next/router'
import PayWithCashModal from './PayWithCashModal'
import PayWithCardModal from './PayWithCardModal'

const Step1 = (props: { route?: string }) => {
  // Router.replace(props.route ? props.route : '/dashboard')
  const [cashModal, setCashModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cardModal, setCardModal] = useState(false)

  const closeError = useCallback(() => setError(''), [])
  const openCashModal = useCallback(() => setCashModal(true), [])
  const closeCashModal = useCallback(() => {
    setError('')
    setCashModal(false)
  }, [])
  const openCardModal = useCallback(() => setCardModal(true), [])
  const closeCardModal = useCallback(() => setCardModal(false), [])
  const handleCashPayment = useCallback(async ({ masterPassword }) => {
    setLoading(true)
    try {
      // TODO: verify password with server
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Row>
      <Col xs={12} className='mb-4'>
        <h3 className='font-weight-bold'>Payment</h3>
        <p>
          As part of our affiliation with the UWA Student Guild, we are required
          to charge a membership fee. While we strive to make all our content
          and events open to everyone, there are perks to being a financial
          member to the club. These include:
          <ul>
            <li>Access to club room</li>
            <li>Ability to join the club committee and vote</li>
            <li>Work on our summer and winter projects with other members</li>
            <li>Members discounts to payed events</li>
          </ul>
          Our membership is <strong>$5 per year</strong>. Please chose a payment
          option for your membership below:
        </p>
      </Col>
      <Col xs={12} md={6}>
        <Card body outline color='primary' className='rounded-0 text-center'>
          <CardText>
            <i className='material-icons-sharp md-xl'>monetization_on</i>
          </CardText>

          <Button color='primary' className='rounded-0' onClick={openCashModal}>
            Pay with Cash
          </Button>
          <PayWithCashModal
            isOpen={cashModal}
            closeModal={closeCashModal}
            loading={loading}
            error={error}
            closeError={closeError}
            handleCashPayment={handleCashPayment}
          />
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card body inverse color='primary' className='rounded-0 text-center'>
          <CardText>
            <i className='material-icons-sharp md-xl'>credit_card</i>
          </CardText>

          <Button
            color='secondary'
            className='rounded-0'
            onClick={openCardModal}
          >
            Pay with Card Online
          </Button>
          <PayWithCardModal isOpen={cardModal} closeModal={closeCardModal} />
        </Card>
      </Col>
      <Col className='mt-4 d-flex justify-content-end'>
        <Button color='link' className='px-0'>
          Skip Payment For Now
        </Button>
      </Col>
    </Row>
  )
}

export default Step1
