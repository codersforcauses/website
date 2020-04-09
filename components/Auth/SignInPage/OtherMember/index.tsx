/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  UncontrolledAlert
} from 'reactstrap'
import ForgotPasswordModal from './ForgotPasswordModal'
import { styles } from './styles'

const OtherMember = (props: { theme: Object }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)

  const handleSubmit = () => {}

  return (
    <Form css={styles(props.theme)}>
      <UncontrolledAlert color='error' className='rounded-0'>
        Invalid email or password
      </UncontrolledAlert>
      <FormGroup>
        <Label for='email' className='monospace'>
          Email
        </Label>
        <Input
          type='email'
          name='email'
          id='email'
          placeholder='hello@codersforcauses.org'
          size='lg'
          className='rounded-0 border-dark'
        />
      </FormGroup>
      <FormGroup>
        <Label for='password' className='monospace'>
          Password
        </Label>
        <InputGroup>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            name='password'
            id='password'
            placeholder='********'
            size='lg'
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
        </InputGroup>
      </FormGroup>
      <Button size='lg' color='primary' className='rounded-0 monospace px-4'>
        Sign in
      </Button>
      <Button color='link' onClick={() => setForgotPassword(true)}>
        Forgot Password?
      </Button>
      <ForgotPasswordModal
        isOpen={forgotPassword}
        closeModal={() => setForgotPassword(false)}
        handleSubmit={handleSubmit}
      />
    </Form>
  )
}

export default withTheme(OtherMember)
