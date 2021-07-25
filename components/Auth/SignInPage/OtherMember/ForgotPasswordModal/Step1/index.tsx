import { useCallback } from 'react'
import { Form, TextField } from '@components/Elements/FormElements'
import { SubmitHandler } from 'react-hook-form'
import { Button, GhostButton } from '@components/Elements/Button'

const Step1 = (props: Props) => {
  const handleSubmit = useCallback(
    () => props.submit(props?.values?.email),
    [props]
  )
  return (
    <Form<FormValues>
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
    >
      <TextField
        type='email'
        name='email'
        label='Email'
        autoComplete='email'
        placeholder='hello@codersforcauses.org'
        description="We'll send you an email with a reset code"
      />
      <div className='flex align-items-center'>
        <Button
          disabled={!props.values.email || props.loading}
          onClick={handleSubmit}
        >
          Send
        </Button>
        <GhostButton onClick={props.handleChangeStep}>
          Have a reset code?
        </GhostButton>
      </div>
    </Form>
  )
}

export default Step1

interface FormValues {
  email: string
}
interface Props {
  values: any
  loading: boolean
  handleChangeStep: () => void
  submit: SubmitHandler<FormValues>
}
