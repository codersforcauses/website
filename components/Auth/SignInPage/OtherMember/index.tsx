/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useContext } from 'react'
import { DarkContext } from 'helpers/user'
import { Auth } from '@aws-amplify/auth'
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
import Spinner from 'components/Elements/Spinner'
import ForgotPasswordModal from './ForgotPasswordModal'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  email: '',
  password: ''
})

const OtherMember = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [resetCode, setResetCode] = useState(false)
  const isDark = useContext(DarkContext)

  const [error, setError] = useState('')

  const theme = useTheme()

  const closeModal = () => {
    setForgotPassword(false)
    setResetCode(false)
  }
  const handleSendPasswordResetCode = async email => {
    setLoading(true)
    try {
      if (email.includes('@student.uwa.edu.au')) {
        throw new Error(
          'You cannot change the password of your UWA student account. If you wish to do so, please do change it through the UWA portal.'
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
  }
  const handleResetCodeSubmit = async ({ email, code, password }) => {
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
  }
  const changeStep = () => setResetCode(!resetCode)

  return (
    <Form css={styles(theme)}>
      <UncontrolledAlert
        isOpen={!!props.error}
        toggle={props.closeError}
        color='danger'
        className='rounded-0'
      >
        {props.error}
      </UncontrolledAlert>
      <FormGroup>
        <Label for='email' className='monospace'>
          Email
        </Label>
        <Input
          type='email'
          bsSize='lg'
          tag={Field}
          disabled={props.loading}
          placeholder='hello@codersforcauses.org'
          id='email'
          name='email'
          value={props.values.email}
          invalid={props.errors.email && props.touched.email}
          className='rounded-0 text-primary border-primary'
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
            disabled={props.loading}
            placeholder='********'
            id='password'
            name='password'
            value={props.values.password}
            invalid={props.errors.password && props.touched.password}
            className='rounded-0 border-primary border-right-0'
          />
          <InputGroupAddon addonType='append'>
            <Button
              outline
              color='primary'
              disabled={props.loading}
              className='rounded-0 border-left-0 d-flex text-primary bg-secondary align-items-center justify-content-center'
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
          type='submit'
          size='lg'
          outline={isDark}
          color={isDark ? 'secondary' : 'primary'}
          disabled={props.loading}
          className='rounded-0 monospace px-4 d-flex align-items-center'
        >
          Sign in
          {props.loading && (
            <Spinner color='secondary' size='sm' className='ml-2' />
          )}
        </Button>
        <Button
          color='link'
          disabled={props.loading}
          onClick={() => setForgotPassword(true)}
          className={`ml-3 ${isDark ? 'text-secondary' : 'text-primary'}`}
        >
          Forgot Password?
        </Button>
      </div>
      <ForgotPasswordModal
        loading={loading}
        error={error}
        closeError={() => setError('')}
        isOpen={forgotPassword}
        isResetStep={resetCode}
        handleChangeStep={changeStep}
        handlePasswordReset={handleResetCodeSubmit}
        closeModal={closeModal}
        handleSendPasswordResetCode={handleSendPasswordResetCode}
      />
    </Form>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
  mapPropsToValues,
  validationSchema
})(OtherMember)

interface FormValues {
  email: string
  password: string
}
interface Props {
  handleSubmit: Function
  closeError: Function
  error: string
  loading: Boolean
}
