import { SubmitHandler } from 'react-hook-form'
import { Form, TextField } from '@components/Elements/FormElements'
import { Button } from '@components/Elements/Button'
import Alert from '@components/Elements/Alert'
import validationSchema from './validation'

const defaultValues = {
  studentNumber: '',
  password: ''
}

const UWAStudent = (props: UWAStudentSignInProps) => {
  return (
    <>
      {props.error && (
        <Alert icon color='danger' className='mt-4'>
          {props.error}
        </Alert>
      )}
      <Form<FormValues>
        showNote
        defaultValues={defaultValues}
        onSubmit={props.handleSubmit}
      >
        <TextField
          label='UWA Student Number'
          name='studentNumber'
          placeholder='211234567'
          autoComplete='username'
          rules={validationSchema.studentNumber}
        />
        <TextField
          type='password'
          label='Password'
          name='password'
          placeholder='********'
          autoComplete='current-password'
          rules={validationSchema.password}
        />
        <Button type='submit' fill className='px-8 font-mono max-w-max'>
          Sign-in
        </Button>
      </Form>
    </>
  )
}

interface FormValues {
  studentNumber: string
  password: string
}
interface UWAStudentSignInProps {
  handleSubmit: SubmitHandler<FormValues>
  closeError: () => void
  error: string
  loading: boolean
}

export default UWAStudent
export type UWAStudentValues = keyof FormValues
