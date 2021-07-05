import { RegisterOptions } from 'react-hook-form'
import { UWAStudentValues } from './index'

const validationSchema: Record<UWAStudentValues, RegisterOptions> = {
  studentNumber: {
    required: 'Please enter your UWA student number',
    validate: {
      isDigit: v =>
        /^[0-9]*$/.test(v) || 'Your student number must contain only digits',
      isUWAStudentNum: v =>
        /^\d{8}$/.test(v) || 'Your student number must be 8 digits long'
    }
  },
  password: {
    required: 'Please enter a password'
  }
}

export default validationSchema
