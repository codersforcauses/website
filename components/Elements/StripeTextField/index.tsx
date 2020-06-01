/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import { FormGroup, FormFeedback, FormText, Label } from 'reactstrap'
import { Theme } from 'lib/theme'

const StripeTextField = () => {
  const [error, setError] = useState('')
  const theme: Theme = useTheme()

  const handleChange = event => {
    if (event.error) setError(event.error.message)
    else setError('')
  }

  const CARD_ELEMENT_OPTIONS = {
    hidePostalCode: true,
    classes: {
      base:
        'border border-primary text-primary form-control-lg form-control rounded-0',
      invalid: 'is-invalid'
    },
    style: {
      base: {
        color: theme.colors.primary,
        fontFamily:
          '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '30px',
        '::placeholder': {
          color: '#6c757d'
        }
      }
    }
  }
  return (
    <FormGroup>
      <Label for='card-element' className='monospace'>
        Card Details
      </Label>
      <CardElement
        id='card-element'
        options={CARD_ELEMENT_OPTIONS}
        onChange={handleChange}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
      {!error && <FormText>We will never save your card information</FormText>}
    </FormGroup>
  )
}

export default StripeTextField
