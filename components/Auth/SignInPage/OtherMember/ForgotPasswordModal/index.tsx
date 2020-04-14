/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import Spinner from '../../../../Elements/Spinner'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  email: ''
})

const ForgotPasswordModal = (props: Props & FormikProps<FormValues>) => {
  return (
    <Modal centered isOpen={props.isOpen} toggle={props.closeModal}>
      <ModalHeader
        toggle={props.closeModal}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        Forgot Password?
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='email' className='monospace'>
              Email
            </Label>
            <Input
              type='email'
              bsSize='lg'
              tag={Field}
              placeholder='hello@codersforcauses.org'
              name='email'
              value={props.values.email}
              invalid={props.errors.email && props.touched.email}
              className='rounded-0 text-dark border-dark'
            />
            <FormFeedback>{props.errors.email}</FormFeedback>
            {!props.errors.email && (
              <FormText>We'll send you an email to rest your password</FormText>
            )}
          </FormGroup>
          <Button
            size='lg'
            color='primary'
            className='rounded-0 monospace px-4 d-flex align-items-center'
          >
            Send
            {props.loading && (
              <Spinner color='secondary' size='sm' className='ml-2' />
            )}
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
  mapPropsToValues,
  validationSchema
})(ForgotPasswordModal)

interface FormValues {
  email: string
}
interface Props {
  loading: Boolean
  isOpen: Boolean
  closeModal: Function
  handleSubmit: Function
}
