import { SubmitHandler } from 'react-hook-form'
import { Button } from '@components/Elements/Button'
import { CheckField, Form, TextField } from '@components/Elements/FormElements'
import Alert from '@components/Elements/Alert'
import validationSchema from './validation'

const defaultValues: FormValues = {
  studentNumber: '',
  password: '',
  isGuildMember: false
}

const UWAStudent = (props: UWASignUpProps) => (
  <>
    {props.error ? (
      <Alert icon color='danger' className='mt-4'>
        {props.error}
      </Alert>
    ) : (
      <Alert color='info' className='mt-4'>
        If you are a UWA student, you can sign up using your pheme login
        credentials. If not or you wish to join using another email, please
        register using &apos;Email Sign-up&apos;.
      </Alert>
    )}
    <Form<FormValues>
      showNote
      disabled={props.loading}
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
    >
      <TextField
        setFocused
        label='UWA Student Number'
        name='studentNumber'
        placeholder='21234567'
        autoComplete='username'
        rules={validationSchema.studentNumber}
      />
      <TextField
        label='Password'
        name='password'
        type='password'
        placeholder='********'
        autoComplete='new-password'
        rules={validationSchema.password}
      />
      <CheckField label='I am a guild member' name='isGuildMember' />
      <Button
        fill
        type='submit'
        loading={props.loading}
        className='px-8 max-w-max'
      >
        Sign-up
      </Button>
    </Form>
  </>
)

interface UWASignUpProps {
  error: string
  loading: boolean
  handleSubmit: SubmitHandler<FormValues>
}
interface FormValues {
  studentNumber: string
  password: string
  isGuildMember: boolean
}

export type UWAStudentKeys = keyof Omit<FormValues, 'isGuildMember'>
export default UWAStudent
