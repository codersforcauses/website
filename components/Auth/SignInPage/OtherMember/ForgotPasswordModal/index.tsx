import { SubmitHandler, useFormContext } from 'react-hook-form'
import Modal from '@components/Elements/Modal'
import Alert from '@components/Elements/Alert'
import Step1 from './Step1'
import Step2 from './Step2'
import validationSchema from './validation'
import { useRef } from 'react'

const defaultValues: FormValues = {
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
}

const ForgotPasswordModal = ({
  isOpen,
  closeModal,
  error,
  closeError,
  isResetStep,
  handleSendPasswordResetCode,
  handlePasswordReset,
  ...props
}: Props) => {
  const { watch } = useFormContext()
  const password = useRef({})
  password.current = watch('password', '')
  return (
    <Modal heading='Forgot Password?' open={isOpen} onClose={closeModal}>
      {isResetStep && (
        <Alert color='success' className='rounded-0'>
          We&apos;ve sent you an email with a verification code
        </Alert>
      )}
      {error && (
        <Alert color='danger' className='rounded-0'>
          {error}
        </Alert>
      )}
      {isResetStep ? (
        <Step2 {...props} />
      ) : (
        <Step1 {...props} submit={handleSendPasswordResetCode} />
      )}
    </Modal>
  )
}

export default ForgotPasswordModal

interface FormValues {
  email: string
  code: string
  password: string
  confirmPassword: string
}
interface Props {
  loading: boolean
  isOpen: boolean
  isResetStep: boolean
  error: string
  closeError: () => void
  closeModal: () => void
  handleChangeStep: () => void
  handleSendPasswordResetCode: (email: string) => Promise<void>
  // handlePasswordReset: SubmitHandler<>
}

export type ForgotPasswordValues = keyof FormValues
