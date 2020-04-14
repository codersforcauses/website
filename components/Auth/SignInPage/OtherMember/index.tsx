/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  UncontrolledAlert
} from 'reactstrap'
import ForgotPasswordModal from './ForgotPasswordModal'
import Spinner from '../../../Elements/Spinner'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  email: '',
  password: ''
})

const OtherMember = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async values => {
    setLoading(true)
    setLoading(false)
    setForgotPassword(false)
  }

  return (
    <Form css={styles(props.theme)}>
      {/* <UncontrolledAlert color='error' className='rounded-0'>
        Invalid email or password
      </UncontrolledAlert> */}
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
      </FormGroup>
      <FormGroup>
        <Label for='password' className='monospace'>
          Password
        </Label>
        <InputGroup>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            bsSize='lg'
            tag={Field}
            placeholder='********'
            name='password'
            value={props.values.password}
            invalid={props.errors.password && props.touched.password}
            className='rounded-0 border-dark border-right-0'
          />
          <InputGroupAddon addonType='append'>
            <Button
              outline
              color='primary'
              className='rounded-0 border-left-0 d-flex align-items-center justify-content-center'
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i className='material-icons-sharp'>
                {passwordVisible ? 'visibility' : 'visibility_off'}
              </i>
            </Button>
          </InputGroupAddon>
          <FormFeedback>{props.errors.password}</FormFeedback>
        </InputGroup>
      </FormGroup>
      <div className='d-flex'>
        <Button
          size='lg'
          color='primary'
          className='rounded-0 monospace px-4 d-flex align-items-center'
        >
          Sign in
          {props.loading && (
            <Spinner color='secondary' size='sm' className='ml-2' />
          )}
        </Button>
        <Button color='link' onClick={() => setForgotPassword(true)}>
          Forgot Password?
        </Button>
      </div>
      <ForgotPasswordModal
        loading={loading}
        isOpen={forgotPassword}
        closeModal={() => setForgotPassword(false)}
        handleSubmit={handleSubmit}
      />
    </Form>
  )
}

export default withTheme(
  withFormik<Props, FormValues>({
    handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
    mapPropsToValues,
    validationSchema
  })(OtherMember)
)

interface FormValues {
  email: string
  password: string
}
interface Props {
  handleSubmit: Function
  loading: Boolean
  theme: Object
}
