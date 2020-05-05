import React from 'react'
import { FormikProps, withFormik } from 'formik'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Alert,
  UncontrolledAlert
} from 'reactstrap'
import Step1 from './Step1'
import Step2 from './Step2'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const ForgotPasswordModal = ({
  isOpen,
  closeModal,
  error,
  closeError,
  isResetStep,
  handleSendPasswordResetCode,
  handlePasswordReset,
  ...props
}: Props & FormikProps<FormValues>) => {
  const closeBtn = (
    <Button color='link' className='p-0' onClick={closeModal}>
      <i className='material-icons-sharp'>close</i>
    </Button>
  )
  return (
    <Modal centered isOpen={isOpen} toggle={closeModal}>
      <ModalHeader
        toggle={closeModal}
        close={closeBtn}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        Forgot Password?
      </ModalHeader>
      <ModalBody>
        <Alert isOpen={isResetStep} color='success' className='rounded-0'>
          We've sent you an email with a verification code
        </Alert>
        <UncontrolledAlert
          isOpen={!!error}
          toggle={closeError}
          color='danger'
          className='rounded-0'
        >
          {error}
        </UncontrolledAlert>
        {isResetStep ? (
          <Step2 {...props} />
        ) : (
          <Step1 {...props} submit={handleSendPasswordResetCode} />
        )}
      </ModalBody>
    </Modal>
  )
}
export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handlePasswordReset(values, bag),
  mapPropsToValues,
  validationSchema
})(ForgotPasswordModal)

interface FormValues {
  email: string
  code: string
  password: string
  confirmPassword: string
}
interface Props {
  loading: Boolean
  isOpen: Boolean
  isResetStep: Boolean
  error: string
  closeError: Function
  closeModal: Function
  handleChangeStep: Function
  handleSendPasswordResetCode: Function
  handlePasswordReset: Function
}
