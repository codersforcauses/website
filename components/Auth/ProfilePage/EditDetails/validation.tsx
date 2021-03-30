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
  bio: string().max(512, 'Your bio cannot be more than 512 characters')
})
