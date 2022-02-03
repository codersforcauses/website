import { RegisterOptions } from 'react-hook-form'
import { UWAStudentKeys } from '.'

const validationSchema: Record<UWAStudentKeys, RegisterOptions> = {
  studentNumber: {
    required: 'Please enter your UWA student number',
    pattern: {
      value: /^[0-9]*$/,
      message: 'Your student number must contain only digits'
    },
    minLength: {
      value: 8,
      message: 'Your student number must be 8 digits long'
    },
    maxLength: {
      value: 8,
      message: 'Your student number must be 8 digits long'
    }
  },
  password: {
    required: 'Please enter your pheme password'
  }
}

export default validationSchema
