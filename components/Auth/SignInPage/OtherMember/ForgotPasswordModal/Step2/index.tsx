/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCallback, useState } from 'react'
import { Field, FormikProps, Form } from 'formik'
import {
  Button,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import Spinner from 'components/Elements/Spinner'

const Step2 = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const setPassVisible = useCallback(
    () => setPasswordVisible(prev => !prev),
    []
  )
  return (
    <Form>
      <FormGroup>
        <Label for='email' className='text-monospace'>
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
        <Label for='email' className='text-monospace'>
          Verification Code
        </Label>
        <Input
          type='text'
          bsSize='lg'
          tag={Field}
          disabled={props.loading}
          placeholder='0000'
          id='code'
          name='code'
          value={props.values.code}
          invalid={props.errors.code && props.touched.code}
          className='rounded-0 text-primary border-primary'
        />
        <FormFeedback>{props.errors.code}</FormFeedback>
        {!props.errors.code && (
          <FormText>Use the code you received from the email sent</FormText>
        )}
      </FormGroup>
      <FormGroup>
        <Label for='password' className='text-monospace'>
          New Password
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
          <FormFeedback>{props.errors.password}</FormFeedback>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for='confirmPassword' className='text-monospace'>
          Confirm New Password
        </Label>
        <InputGroup>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            bsSize='lg'
            tag={Field}
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
              className='rounded-0 border-left-0 d-flex align-items-center justify-content-center'
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
      <div className='d-flex align-items-center justify-content-between'>
        <Button
          type='submit'
          size='lg'
          color='primary'
          disabled={props.loading}
          className='rounded-0 text-monospace px-4 d-flex align-items-center'
        >
          Send
          {props.loading && (
            <Spinner color='secondary' size='sm' className='ml-2' />
          )}
        </Button>
        <Button color='link' onClick={props.handleChangeStep} className='ml-3'>
          Go back
        </Button>
      </div>
    </Form>
  )
}

export default Step2

interface FormValues {
  email: string
  code: string
  password: string
  confirmPassword: string
}
interface Props {
  loading: Boolean
  handleChangeStep: Function
}
