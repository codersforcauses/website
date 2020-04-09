/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'

const OtherMember = (props: {
  isOpen: Boolean
  closeModal: Function
  handleSubmit: Function
  theme: Object
}) => (
  <Modal
    centered
    isOpen={props.isOpen}
    toggle={props.closeModal}
    className='rounded-0'
  >
    <ModalHeader
      toggle={props.closeModal}
      className='bg-transparent border-0 font-weight-bold pb-0'
    >
      Forgot Password?
    </ModalHeader>
    <ModalBody>
      <Form>
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
          <FormText>We'll send you an email to rest your password</FormText>
        </FormGroup>
        <Button
          size='lg'
          color='primary'
          onClick={props.handleSubmit}
          className='rounded-0'
        >
          Send
        </Button>
      </Form>
    </ModalBody>
  </Modal>
)

export default withTheme(OtherMember)
