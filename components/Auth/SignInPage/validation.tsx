import { RegisterOptions } from 'react-hook-form'

const validationSchema: Record<'email', RegisterOptions> = {
  email: {
    required: 'Please enter your email',
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Please enter a valid email address'
    }
  }
}

export default validationSchema
