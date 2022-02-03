import { SubmitHandler } from 'react-hook-form'
import Alert from '@elements/Alert'
import { Button } from '@elements/Button'
import { Form, RadioGroup, TextField } from '@elements/FormElements'
import { genderOptions } from '@lib/global'
import validationSchema from './validation'

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'other'
}

const OtherMember = (props: OtherSignUpProps) => (
  <>
    {props.error && !props.loading && (
      <Alert icon color='danger' className='mt-4'>
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
      <RadioGroup
        horizontal
        label='Gender'
        name='gender'
        options={genderOptions}
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
  gender: 'male' | 'female' | 'other'
}

export type OtherSignUpKeys = keyof FormValues
export default OtherMember
