import { object, string } from 'yup'

export const validationSchema = object().shape({
  firstName: string().required('Please enter your first name'),
  lastName: string().required('Please enter your last name'),
  organisationName: string().required(
    "Please enter your organisation's name or 'N/A' if you don't have one"
  ),
  email: string()
    .required('Please enter your email')
    .email('You must enter a valid email address'),
  message: string().required('Please enter a brief message')
})
