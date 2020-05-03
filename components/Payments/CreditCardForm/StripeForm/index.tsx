import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Form, UncontrolledAlert } from 'reactstrap'
import StripeTextField from 'components/Elements/StripeTextField'

const StripeForm = () => {
  const [error, setError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) setError(result.error.message)
    else {
      setError('')
      // Send the token to server.
      // TODO
    }
  }

  return (
    <Form>
      <UncontrolledAlert
        isOpen={!!error}
        toggle={() => setError(false)}
        color='danger'
        className='rounded-0'
      >
        {error}
      </UncontrolledAlert>
      <StripeTextField />
      <Button
        type='submit'
        size='lg'
        color='primary'
        className='rounded-0 monospace px-5'
        onClick={handleSubmit}
      >
        Send
      </Button>
    </Form>
  )
}

export default StripeForm
