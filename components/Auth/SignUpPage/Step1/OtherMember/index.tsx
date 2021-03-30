/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useCallback, useContext, useState } from 'react'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormFeedback,
  UncontrolledAlert,
  Row,
  Col
} from 'reactstrap'
import Spinner from 'components/Elements/Spinner'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const OtherMember = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  const setPassVisible = useCallback(
    () => setPasswordVisible(prev => !prev),
    []
  )

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
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for='firstName' className='text-monospace'>
              First Name
            </Label>
            <Input
              type='text'
              bsSize='lg'
              tag={Field}
              autoComplete='given-name'
              disabled={props.loading}
              placeholder='John'
              id='firstName'
              name='firstName'
              value={props.values.firstName}
              invalid={props.errors.firstName && props.touched.firstName}
              className='rounded-0 text-primary border-primary'
            />
            <FormFeedback>{props.errors.firstName}</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for='lastName' className='text-monospace'>
              Last Name
            </Label>
            <Input
              type='text'
              bsSize='lg'
              tag={Field}
              autoComplete='family-name'
              disabled={props.loading}
              placeholder='Doe'
              id='lastName'
              name='lastName'
              value={props.values.lastName}
              invalid={props.errors.lastName && props.touched.lastName}
              className='rounded-0 text-primary border-primary'
            />
            <FormFeedback>{props.errors.lastName}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for='email' className='text-monospace'>
          Email
        </Label>
        <Input
          type='email'
          bsSize='lg'
          tag={Field}
          autoComplete='email'
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
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for='password' className='text-monospace'>
              Password
            </Label>
            <InputGroup>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                bsSize='lg'
                tag={Field}
                autoComplete='new-password'
                disabled={props.loading}
                placeholder='********'
                id='password'
                name='password'
                value={props.values.password}
                invalid={props.errors.password && props.touched.password}
                className='rounded-0 text-primary border-primary border-right-0'
              />
              <InputGroupAddon addonType='append'>
                <Button
                  outline
                  color='primary'
                  disabled={props.loading}
                  className='rounded-0 border-left-0 text-primary bg-secondary d-flex align-items-center justify-content-center'
                  onClick={setPassVisible}
                >
                  <i className='material-icons-sharp'>
                    {passwordVisible ? 'visibility' : 'visibility_off'}
                  </i>
                </Button>
              </InputGroupAddon>
              <FormFeedback>{props.errors.password}</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for='confirmPassword' className='text-monospace'>
              Confirm Password
            </Label>
            <InputGroup>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                bsSize='lg'
                tag={Field}
                autoComplete='new-password'
                disabled={props.loading}
                placeholder='********'
                id='confirmPassword'
                name='confirmPassword'
                value={props.values.confirmPassword}
                invalid={
                  props.errors.confirmPassword && props.touched.confirmPassword
                }
                className='rounded-0 text-primary border-primary border-right-0'
              />
              <InputGroupAddon addonType='append'>
                <Button
                  outline
                  color='primary'
                  disabled={props.loading}
                  className='rounded-0 border-left-0 text-primary bg-secondary d-flex align-items-center justify-content-center'
                  onClick={setPassVisible}
                >
                  <i className='material-icons-sharp'>
                    {passwordVisible ? 'visibility' : 'visibility_off'}
                  </i>
                </Button>
              </InputGroupAddon>
              <FormFeedback>{props.errors.confirmPassword}</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Button
        type='submit'
        size='lg'
        outline={isDark}
        color={isDark ? 'secondary' : 'primary'}
        disabled={props.loading}
        className='rounded-0 text-monospace px-4 d-flex align-items-center'
      >
        Sign Up
        {props.loading && (
          <Spinner color='secondary' size='sm' className='ml-2' />
        )}
      </Button>
    </Form>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
  mapPropsToValues,
  validationSchema
})(OtherMember)

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
interface Props {
  handleSubmit: (values, bag) => void
  closeError: () => void
  error: string
  loading: boolean
}
