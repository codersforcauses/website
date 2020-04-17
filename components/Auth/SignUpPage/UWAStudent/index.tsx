/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormFeedback,
  UncontrolledAlert
} from 'reactstrap'
import Spinner from '../../../Elements/Spinner'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  studentNumber: '',
  password: ''
})

const UWAStudent = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <Form css={styles(props.theme)}>
      <UncontrolledAlert color='success' className='rounded-0'>
        If you are a UWA student, you can sign up using your pheme login
        credentials. If not or you wish to join using another email, please
        register using 'Email Sign-up'.
      </UncontrolledAlert>
      <UncontrolledAlert
        isOpen={!!props.error}
        toggle={props.closeError}
        color='error'
        className='rounded-0'
      >
        {props.error}
      </UncontrolledAlert>
      <FormGroup>
        <Label for='studentNumber' className='monospace'>
          UWA Student Number
        </Label>
        <Input
          type='text'
          bsSize='lg'
          tag={Field}
          placeholder='211234567'
          name='studentNumber'
          value={props.values.studentNumber}
          invalid={props.errors.studentNumber && props.touched.studentNumber}
          className='rounded-0 text-dark border-dark'
        />
        <FormFeedback>{props.errors.studentNumber}</FormFeedback>
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
            className='rounded-0 text-dark border-dark border-right-0'
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
      <Button
        size='lg'
        color='primary'
        className='rounded-0 monospace px-4 d-flex align-items-center'
      >
        Sign Up
        {props.loading && (
          <Spinner color='secondary' size='sm' className='ml-2' />
        )}
      </Button>
    </Form>
  )
}

export default withTheme(
  withFormik<Props, FormValues>({
    handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
    mapPropsToValues,
    validationSchema
  })(UWAStudent)
)

interface FormValues {
  studentNumber: string
  password: string
}
interface Props {
  handleSubmit: Function
  closeError: Function
  error: string
  loading: Boolean
  theme: Object
}
