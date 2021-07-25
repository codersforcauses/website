import { RegisterOptions } from 'react-hook-form'
import { ForgotPasswordValues } from './index'

const validationSchema: Record<ForgotPasswordValues, RegisterOptions> = {
  email: {
    required: 'Please enter your email'
  },
  code: {
    required: 'Please enter the verification code',
    pattern: {
      value: /^\d+$/,
      message: 'The verification code must be digits only'
    }
  },
  password: {
    required: 'Please enter a password'
  },
  confirmPassword: {
    required: 'Please confirm your password',
    validate: v => v === password || 'Passwords do not match'
  }
}

export default validationSchema

const validationSchema = object().shape({
  password: string()
    .required('Please enter a password')
    .min(8, 'Your password must contain at least 8 characters')
    .matches(
      /[a-z]/,
      'Your password must contain at least one lowercase letter'
    )
    .matches(
      /[A-Z]/,
      'Your password must contain at least one uppercase letter'
    )
    .matches(/[0-9]+/, 'Your password must contain at least one digit')
    .matches(
      /[*@!#%&()^~{}]+/,
      'Your password must contain at least one special character (@,!,#, etc)'
    )
})
