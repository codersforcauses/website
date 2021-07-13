import { Form, TextField } from '@components/Elements/FormElements'
import { Button } from '@components/Elements/Button'
import Alert from '@components/Elements/Alert'
import { SignIn } from '..'
import validationSchema from './validation'

const defaultValues = {
  studentNumber: '',
  password: ''
}

const UWAStudent = (props: SignIn<FormValues>) => {
  return (
    <>
      {props.error && (
        <Alert icon color='danger' className='mt-4'>
          {props.error}
        </Alert>
      )}
      <Form<FormValues>
        showNote
        disabled={props.disabled}
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
        <Button
          type='submit'
          fill
          disabled={props.loading || props.disabled}
          className='px-8 font-mono max-w-max'
        >
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

export default UWAStudent
export type UWAStudentValues = keyof FormValues
