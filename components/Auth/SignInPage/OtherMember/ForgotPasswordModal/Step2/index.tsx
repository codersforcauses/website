/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
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
import Spinner from '../../../../../Elements/Spinner'

const Step2 = (props: Props & FormikProps<FormValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
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
      </FormGroup>
      <FormGroup>
        <Label for='email' className='monospace'>
          Verification Code
        </Label>
        <Input
          type='text'
          bsSize='lg'
          tag={Field}
          placeholder='0000'
          name='code'
          value={props.values.code}
          invalid={props.errors.code && props.touched.code}
          className='rounded-0 text-dark border-dark'
        />
        <FormFeedback>{props.errors.code}</FormFeedback>
        {!props.errors.code && (
          <FormText>Use the code you received from the email sent</FormText>
        )}
      </FormGroup>
      <FormGroup>
        <Label for='password' className='monospace'>
          New Password
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
      <FormGroup>
        <Label for='confirmPassword' className='monospace'>
          Confirm New Password
        </Label>
        <InputGroup>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            bsSize='lg'
            tag={Field}
            placeholder='********'
            name='confirmPassword'
            value={props.values.confirmPassword}
            invalid={
              props.errors.confirmPassword && props.touched.confirmPassword
            }
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
          <FormFeedback>{props.errors.confirmPassword}</FormFeedback>
        </InputGroup>
      </FormGroup>
      <div className='d-flex align-items-center justify-content-between'>
        <Button
          type='submit'
          size='lg'
          color='primary'
          className='rounded-0 monospace px-4 d-flex align-items-center'
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
