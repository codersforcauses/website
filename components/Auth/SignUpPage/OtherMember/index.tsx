import { SubmitHandler } from 'react-hook-form'
import Alert from '@components/Elements/Alert'
import { Button } from '@components/Elements/Button'
import { Form, TextField } from '@components/Elements/FormElements'
import validationSchema from './validation'

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: ''
}

const OtherMember = (props: OtherSignUpProps) => (
  <>
    {props.error && (
      <Alert icon color='danger'>
        {props.error}
      </Alert>
    )}
    <Form<FormValues>
      showNote
      disabled={props.loading || props.disabled}
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
    >
      <TextField
        setFocused
        label='First Name'
        name='firstName'
        placeholder='John'
        autoComplete='given-name'
        rules={validationSchema.firstName}
      />
      <TextField
        label='Last Name'
        name='lastName'
        placeholder='Doe'
        autoComplete='family-name'
        rules={validationSchema.lastName}
      />
      <TextField
        label='Email'
        name='email'
        type='email'
        placeholder='hello@codersforcauses.org'
        autoComplete='email'
        rules={validationSchema.email}
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

interface OtherSignUpProps {
  disabled?: boolean
  error: string
  loading: boolean
  handleSubmit: SubmitHandler<FormValues>
}
interface FormValues {
  firstName: string
  lastName: string
  email: string
}

export type OtherSignUpKeys = keyof FormValues
export default OtherMember
