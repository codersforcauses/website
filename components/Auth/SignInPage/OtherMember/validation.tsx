import { object, string } from 'yup'

export const validationSchema = object().shape({
  email: string()
    .required('Please enter your email')
    .email('You must enter a valid email address'),
  password: string().required('Please enter a password')
})
