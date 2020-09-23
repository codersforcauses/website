import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeForm from './StripeForm'

const CreditCardForm = () => (
  <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)}>
    <StripeForm />
  </Elements>
)

export default CreditCardForm
