import { RegisterOptions } from 'react-hook-form'
import { OtherStudentValues } from './index'

const validationSchema: Record<OtherStudentValues, RegisterOptions> = {
  email: {
    required: 'Please enter your email'
  },
  password: {
    required: 'Please enter a password'
  }
}

export default validationSchema
