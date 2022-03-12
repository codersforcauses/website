import { useCallback, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import {
  CheckField,
  Form,
  RadioGroup,
  TextArea,
  TextField
} from '@elements/FormElements'
import Alert from '@elements/Alert'
import { Button, GhostButton } from '@elements/Button'
import { genderOptions } from '@lib/global'
import Socials from '../Socials'
import validationSchema from './validation'
import { User } from '@lib/types'

dayjs.extend(localeData)

const EditDetails = (props: EditDetailsProps) => {
  const [isSocialOpen, setIsSocialOpen] = useState(false)
  const toggle = useCallback(() => setIsSocialOpen(prev => !prev), [])

  const defaultValues = {
    firstName: props.user?.firstName ?? '',
    lastName: props.user?.lastName ?? '',
    email: props.user?.email ?? '',
    bio: props.user?.bio ?? '',
    gender: props.user?.gender ?? 'other',
    isGuildMember: props.user?.isGuildMember ?? false,
    dob: {
      day: 1,
      month: 'January',
      year: 2000
    }
  }

  return (
    <Form<FormValues>
      showNote
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
      className='mt-0'
    >
      {props.error && (
        <Alert icon color='danger'>
          {props.error}
        </Alert>
      )}
      <div className='grid grid-cols-2 gap-2 md:gap-4'>
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
      </div>
      <TextField
        label='Email'
        name='email'
        inputMode='email'
        placeholder='hello@codersforcauses.org'
        autoComplete='email'
        rules={validationSchema.email}
      />
      <TextField
        label='Date of Birth'
        name='dob'
        type='date'
        placeholder='01/01/2000'
        pattern='\d{2}\/\d{2}\/\d{4}'
        max={`${new Date().getFullYear() - 10}-12-31`}
        autoComplete='bday'
        rules={validationSchema.dob}
      />
      <TextArea
        label='Bio'
        name='bio'
        placeholder='Tell us about yourself'
        counter={512}
        rules={validationSchema.bio}
      />
      <RadioGroup
        horizontal
        label='Gender'
        name='gender'
        options={genderOptions}
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

      <div className='flex justify-between'>
        <Button dark type='submit' loading={props.loading} className='px-12'>
          {props.loading ? 'Updating' : 'Update'}
        </Button>
        <GhostButton
          dark
          type='button'
          className='px-12'
          onClick={props.handleCancel}
        >
          Cancel
        </GhostButton>
      </div>

      {/* 
      <Collapse isOpen={!isSocialOpen}>
        <Button
          block
          size='lg'
          color='success'
          className='px-4 mb-4 rounded-0 text-monospace d-lg-none'
          onClick={toggle}
        >
          Link Socials
        </Button>
      </Collapse>
      <Collapse isOpen={isSocialOpen}>
        <Socials isEditing />
        <div className='flex-row-reverse my-3 d-flex'>
          <Button
            size='lg'
            color='link'
            className={`rounded-0 text-monospace text-${
              isDark ? 'secondary' : 'primary'
            }`}
            onClick={toggle}
          >
            Close
          </Button>
        </div>
      </Collapse>
 */}
    </Form>
  )
}

interface FormValues {
  firstName: string
  lastName: string
  email: string
  bio: string
  isGuildMember: boolean
  gender: string
  dob: Date
}
interface EditDetailsProps {
  user: User
  loading: boolean
  error: string
  closeError: () => void
  handleCancel: () => void
  handleSubmit: SubmitHandler<FormValues>
}

export type EditDetailsKeys = keyof FormValues
export default EditDetails
