import { object, string } from 'yup'

export const validationSchema = object().shape({
  studentNumber: string()
    .required('Please enter your UWA student number')
    .matches(/^[0-9]*$/, 'Your student number must contain only digits')
    .matches(/^\d{8}$/, 'Your student number must be 8 digits long'),
  password: string().required('Please enter a password')
})
