import { useCallback, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Form, TextField } from '@components/Elements/FormElements'
import { Button, GhostButton } from '@components/Elements/Button'
import Alert from '@components/Elements/Alert'
import { SignIn } from '..'
import ForgotPasswordModal from './ForgotPasswordModal'
import validationSchema from './validation'

const defaultValues: FormValues = {
  email: '',
  password: ''
}

const OtherMember = (props: SignIn<FormValues>) => {
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [resetCode, setResetCode] = useState(false)

  const [error, setError] = useState('')

  const closeError = useCallback(() => setError(''), [])

  const openModal = useCallback(() => setForgotPassword(true), [])
  const closeModal = useCallback(() => {
    setForgotPassword(false)
    setResetCode(false)
  }, [])
  const handleSendPasswordResetCode = useCallback(async email => {
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}users?email=${email}&$select[]=signUpType`
      )
      const {
        data: [member]
      } = await response.json()

      if (member.signUpType === 'pheme') {
        throw new Error(
          'You cannot change the password of your UWA student account. If you wish to do so, please do change it through the UWA portal and wait at least 1 hour before you try again.'
        )
      }
      await Auth.forgotPassword(email.trim())
      setError('')
      setResetCode(true)
    } catch ({ code, message }) {
      if (code === 'UserNotFoundException') {
        setError(
          'Email not found. Please make sure you are using the email you registered with.'
        )
      } else setError(message)
    } finally {
      setLoading(false)
    }
  }, [])
  const handleResetCodeSubmit = useCallback(
    async ({ email, code, password }) => {
      setLoading(true)
      try {
        await Auth.forgotPasswordSubmit(
          email.trim(),
          code.trim(),
          password.trim()
        )
      } catch ({ message }) {
        setError(message)
      } finally {
        setLoading(false)
        setError('')
        setResetCode(false)
        setForgotPassword(false)
      }
    },
    []
  )
  const changeStep = useCallback(() => setResetCode(prev => !prev), [])

  return (
    <Form<FormValues>
      showNote
      disabled={props.disabled}
      defaultValues={defaultValues}
      onSubmit={props.handleSubmit}
    >
      {props.error && (
        <Alert icon color='danger' className='mt-4'>
          {props.error}
        </Alert>
      )}
      <TextField
        label='Email'
        name='email'
        type='email'
        placeholder='hello@codersforcauses.org'
        autoComplete='email'
        rules={validationSchema.email}
      />
      <TextField
        type='password'
        label='Password'
        name='password'
        placeholder='********'
        autoComplete='current-password'
        rules={validationSchema.password}
      />
      <div className='flex justify-between'>
        <Button
          type='submit'
          fill
          disabled={props.loading || props.disabled}
          className='px-8 font-mono'
        >
          Sign-in
        </Button>
        <GhostButton
          type='button'
          disabled={props.loading || props.disabled}
          className='text-sm sm:text-lg'
          onClick={openModal}
        >
          Forgot Password?
        </GhostButton>
      </div>

      {/* <ForgotPasswordModal
        loading={loading}
        error={error}
        closeError={closeError}
        isOpen={forgotPassword}
        isResetStep={resetCode}
        handleChangeStep={changeStep}
        handlePasswordReset={handleResetCodeSubmit}
        closeModal={closeModal}
        handleSendPasswordResetCode={handleSendPasswordResetCode}
      /> */}
    </Form>
  )
}

interface FormValues {
  email: string
  password: string
}

export default OtherMember
export type OtherStudentValues = keyof FormValues
