import { RegisterOptions } from 'react-hook-form'
import { OtherSignUpKeys } from '.'

const validationSchema: Record<OtherSignUpKeys, RegisterOptions> = {
  firstName: {
    required: 'Please enter your first name',
    maxLength: {
      value: 64,
      message: 'Our first name limit is 64 characters'
    }
  },
  lastName: {
    // required: 'Please enter your last name',
    maxLength: {
      value: 64,
      message: 'Our last name limit is 64 characters'
    }
  },
  email: {
    required: 'Please enter your email',
    maxLength: {
      value: 128,
      message: 'Our email limit is 128 characters'
    },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Please enter a valid email address'
    }
  },
  gender: {}
}

export default validationSchema
