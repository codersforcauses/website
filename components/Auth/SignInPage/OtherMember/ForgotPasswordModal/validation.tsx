import { object, string } from 'yup'

export const validationSchema = object().shape({
  email: string()
    .required('Please enter your email')
    .email('You must enter a valid email address'),
  code: string()
    .required('Please enter the verification code')
    .matches(/^\d+$/, 'The verification code must be digits only'),
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
    ),
  confirmPassword: string()
    .required('Please confirm your password')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return this.parent.password === value
    })
})
