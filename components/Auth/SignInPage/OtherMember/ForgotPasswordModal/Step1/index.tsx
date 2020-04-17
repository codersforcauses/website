/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Field, FormikProps, Form } from 'formik'
import {
  Button,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input
} from 'reactstrap'
import Spinner from '../../../../../Elements/Spinner'

const Step1 = (props: Props & FormikProps<FormValues>) => (
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
        id='email'
        name='email'
        value={props.values.email}
        invalid={props.errors.email && props.touched.email}
        className='rounded-0 text-dark border-dark'
      />
      <FormFeedback>{props.errors.email}</FormFeedback>
      {!props.errors.email && (
        <FormText>We'll send you an email with a reset code</FormText>
      )}
    </FormGroup>
    <div className='d-flex align-items-center'>
      <Button
        size='lg'
        color='primary'
        disabled={!props.values.email}
        onClick={() => props.submit(props.values.email)}
        className='rounded-0 monospace px-4 d-flex align-items-center'
      >
        Send
        {props.loading && (
          <Spinner color='secondary' size='sm' className='ml-2' />
        )}
      </Button>
      <Button color='link' onClick={props.handleChangeStep} className='ml-3'>
        Have a reset code?
      </Button>
    </div>
  </Form>
)

export default Step1

interface FormValues {
  email: string
}
interface Props {
  loading: Boolean
  handleChangeStep: Function
  submit: Function
}
