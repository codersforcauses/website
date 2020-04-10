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
  UncontrolledAlert,
  Row,
  Col
} from 'reactstrap'
import { styles } from './styles'

const OtherMember = (props: { theme: Object }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <Form css={styles(props.theme)}>
      <UncontrolledAlert color='error' className='rounded-0'>
        Invalid email or password
      </UncontrolledAlert>
      <FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for='firstName' className='monospace'>
                First Name
              </Label>
              <Input
                type='text'
                name='firstName'
                id='firstName'
                placeholder='John'
                size='lg'
                className='rounded-0 border-dark'
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='lastName' className='monospace'>
                Last Name
              </Label>
              <Input
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Doe'
                size='lg'
                className='rounded-0 border-dark'
              />
            </FormGroup>
          </Col>
        </Row>
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
      <Row form>
        <Col md={6}>
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
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for='confirmPassword' className='monospace'>
              Confirm Password
            </Label>
            <InputGroup>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                name='confirmPassword'
                id='confirmPassword'
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
        </Col>
      </Row>

      <Button size='lg' color='primary' className='rounded-0 monospace px-4'>
        Sign Up
      </Button>
    </Form>
  )
}

export default withTheme(OtherMember)
