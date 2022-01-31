import { SubmitHandler } from 'react-hook-form'
import { Button } from '@elements/Button'
import { CheckField, Form, TextField } from '@elements/FormElements'
import Alert from '@elements/Alert'
import validationSchema from './validation'

const defaultValues: FormValues = {
  studentNumber: '',
  password: '',
  isGuildMember: false
}

const UWAStudent = (props: UWASignUpProps) => (
  <>
    {props.error && !props.loading ? (
      <Alert icon color='danger' className='mt-4'>
        {props.error}
      </Alert>
    ) : (
      !props.loading && (
        <Alert color='info' className='mt-4'>
          If you are a UWA student, you can sign up using your pheme login
          credentials (recommended). If not or you wish to join using another
          email, please register using &apos;Email Sign-up&apos;.
        </Alert>
      )
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
      <CheckField
        label={
          <>
            I am a{' '}
            <a
              href='https://www.uwastudentguild.com/the-guild/join-us'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline focus:outline-none focus:ring-1 focus:ring-accent'
            >
              UWA Guild Member
              <i
                title='open in new tab'
                className='text-xs material-icons-sharp ml-0.5 select-none'
              >
                open_in_new
              </i>
            </a>
          </>
        }
        name='isGuildMember'
      />
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
