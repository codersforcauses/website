import { RegisterOptions } from 'react-hook-form'
import { ContactFormValues } from './index'

const validationSchema: Partial<Record<ContactFormValues, RegisterOptions>> = {
  name: {
    required: 'Please enter your name'
  },
  email: {
    required: 'Please enter your email'
  },
  message: {
    required: 'Please enter a brief message'
  }
}

export default validationSchema
