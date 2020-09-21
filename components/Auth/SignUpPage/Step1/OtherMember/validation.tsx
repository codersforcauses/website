import { object, string } from 'yup'

export const validationSchema = object().shape({
  firstName: string()
    .max(64, 'Our first name limit is 64 characters')
    .required('Please enter your first name'),
  lastName: string()
    .max(64, 'Our last name limit is 64 characters')
    .required('Please enter your last name'),
  email: string()
    .required('Please enter your email')
    .max(64, 'Our email limit is 128 characters')
    .email('You must enter a valid email address'),
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
