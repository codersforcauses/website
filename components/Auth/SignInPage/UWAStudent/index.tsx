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
import { styles } from './styles'

const UWAStudent = (props: { theme: Object }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <Form css={styles(props.theme)}>
      <UncontrolledAlert color='error' className='rounded-0'>
        Invalid student number or pheme password
      </UncontrolledAlert>
      <FormGroup>
        <Label for='studentNumber' className='monospace'>
          UWA Student Number
        </Label>
        <Input
          type='text'
          name='studentNumber'
          id='studentNumber'
          placeholder='211234567'
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
    </Form>
  )
}

export default withTheme(UWAStudent)
