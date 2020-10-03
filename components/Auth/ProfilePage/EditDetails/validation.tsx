import { object, string } from 'yup'

export const validationSchema = object().shape({
  firstName: string().required('Please enter your first name'),
  lastName: string().required('Please enter your last name'),
  email: string()
    .required('Please enter your email')
    .email('You must enter a valid email address'),
  organisationName: string().required("Please enter your organisation's name"),
  message: string().required('Please enter a brief message')
})
