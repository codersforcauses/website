import React, { useState, useMemo, useCallback } from 'react'
import { Form, Field, FormikProps, withFormik } from 'formik'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  UncontrolledAlert,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Button
} from 'reactstrap'

const mapPropsToValues = () => ({
  masterPassword: ''
})

const PayWithCashModal = ({
  isOpen,
  closeModal,
  error,
  closeError,
  ...props
}: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const closeBtn = useMemo(
    () => (
      <Button color='link' className='p-0' onClick={closeModal}>
        <i className='material-icons-sharp'>close</i>
      </Button>
    ),
    [closeModal]
  )
  const setPassVisible = useCallback(
    () => setPasswordVisible(prev => !prev),
    []
  )

  return (
    <Modal centered isOpen={isOpen} toggle={closeModal}>
      <ModalHeader
        toggle={closeModal}
        close={closeBtn}
        className='bg-transparent border-0 font-weight-bold pb-0'
      >
        Pay With Cash
      </ModalHeader>
      <ModalBody>
        <Alert color='success' className='rounded-0'>
          To confirm your payment with cash, please have a committee member
          enter the password.
        </Alert>
        <UncontrolledAlert
          isOpen={!!error}
          toggle={closeError}
          color='danger'
          className='rounded-0'
        >
          {error}
        </UncontrolledAlert>
        <Form>
          <FormGroup>
            <Label for='masterPassword' className='text-monospace'>
              Master Password
            </Label>
            <InputGroup>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                bsSize='lg'
                tag={Field}
                disabled={props.loading}
                placeholder='********'
                id='masterPassword'
                name='masterPassword'
                value={props.values.masterPassword}
                invalid={
                  props.errors.masterPassword && props.touched.masterPassword
                }
                className='rounded-0 text-primary border-primary border-right-0'
              />
              <InputGroupAddon addonType='append'>
                <Button
                  outline
                  color='primary'
                  disabled={props.loading}
                  className='rounded-0 border-left-0 d-flex align-items-center justify-content-center'
                  onClick={setPassVisible}
                >
                  <i className='material-icons-sharp'>
                    {passwordVisible ? 'visibility' : 'visibility_off'}
                  </i>
                </Button>
              </InputGroupAddon>
              <FormFeedback>{props.errors.masterPassword}</FormFeedback>
            </InputGroup>
          </FormGroup>
          <Button
            type='submit'
            size='lg'
            color='primary'
            className='rounded-0 text-monospace px-5'
          >
            Verify
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleCashPayment(values, bag),
  mapPropsToValues
})(PayWithCashModal)

interface FormValues {
  masterPassword: string
}
interface Props {
  loading: Boolean
  isOpen: Boolean
  error: string
  closeError: Function
  closeModal: Function
  handleCashPayment: Function
}
