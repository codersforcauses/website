import { RegisterOptions } from 'react-hook-form'
import { ContactFormValues } from './index'

const validationSchema: Partial<Record<ContactFormValues, RegisterOptions>> = {
  name: {
    required: 'Please enter your name'
  },
  email: {
    required: 'Please enter your email',
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Please enter a valid email address'
    }
  },
  message: {
    required: 'Please enter a brief message'
  }
}

export default validationSchema
