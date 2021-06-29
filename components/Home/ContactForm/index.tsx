import { SubmitHandler } from 'react-hook-form'
import { Button, GhostButton } from '@components/Elements/Button'
import { Form, TextArea, TextField } from '@components/Elements/FormElements'
import rules from './validation'

const defaultValues: FormValues = {
  name: '',
  organizationName: '',
  email: '',
  message: ''
}

const ContactForm = (props: ContactFormProps) => {
  return (
    <Form<FormValues>
      dark
      disabled={props.loading}
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
      className='mt-4 lg:w-3/4'
    >
      <p className='flex items-center font-mono opacity-75'>
        <span className='mr-2 select-none material-icons-sharp'>info</span>
        All fields with * are required
      </p>
      <TextField
        label='Name'
        name='name'
        autoComplete='name'
        placeholder='John Doe'
        rules={rules.name}
      />
      <TextField
        label='Organization Name'
        name='organizationName'
        autoComplete='organization'
        placeholder='Coders for Causes'
        rules={rules.organizationName}
      />
      <TextField
        label='Email'
        name='email'
        type='email'
        autoComplete='email'
        placeholder='hello@codersforcauses.org'
        rules={rules.email}
      />
      <TextArea
        label='Message'
        name='message'
        placeholder='Write a short message her to get things started'
        rules={rules.message}
      />
      <div className='flex justify-between'>
        <Button dark type='submit' loading={props.loading} className='px-12'>
          {props.loading ? 'Sending' : 'Send'}
        </Button>
        <GhostButton
          dark
          type='button'
          className='px-12'
          onClick={props.handleCloseForm}
        >
          Cancel
        </GhostButton>
      </div>
    </Form>
  )
}
interface FormValues {
  name: string
  organizationName: string
  email: string
  message: string
}

interface ContactFormProps {
  loading: boolean
  handleCloseForm: () => void
  handleSubmit: SubmitHandler<FormValues>
}

export default ContactForm
export type ContactFormValues = keyof FormValues
