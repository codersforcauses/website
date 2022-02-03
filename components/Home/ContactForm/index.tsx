import { memo } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Button, GhostButton } from '@elements/Button'
import { Form, TextArea, TextField } from '@elements/FormElements'
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
      showNote
      disabled={props.loading}
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
      className='mt-4 lg:w-3/4'
    >
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
        placeholder='Write a short message here to get things started'
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

export default memo(ContactForm)
export type ContactFormValues = keyof FormValues
