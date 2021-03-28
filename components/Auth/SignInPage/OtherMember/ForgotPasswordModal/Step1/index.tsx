import { jsx } from '@emotion/react'
import { useCallback, useContext } from 'react'
import { Field, FormikProps, Form } from 'formik'
import {
  Button,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input
} from 'reactstrap'
import Spinner from 'components/Elements/Spinner'
import { DarkContext } from 'helpers/user'

const Step1 = (props: Props & FormikProps<FormValues>) => {
  const isDark = useContext(DarkContext)
  const handleSubmit = useCallback(() => props.submit(props.values.email), [
    props.values.email
  ])
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
        {!props.errors.email && (
          <FormText>We'll send you an email with a reset code</FormText>
        )}
      </FormGroup>
      <div className='d-flex align-items-center'>
        <Button
          size='lg'
          outline={isDark}
          color={isDark ? 'secondary' : 'primary'}
          disabled={!props.values.email || props.loading}
          className='rounded-0 text-monospace px-4 d-flex align-items-center'
          onClick={handleSubmit}
        >
          Send
          {props.loading && (
            <Spinner color='secondary' size='sm' className='ml-2' />
          )}
        </Button>
        <Button
          color='link'
          onClick={props.handleChangeStep}
          className={`ml-3 text-${isDark ? 'secondary' : 'primary'}`}
        >
          Have a reset code?
        </Button>
      </div>
    </Form>
  )
}

export default Step1

interface FormValues {
  email: string
}
interface Props {
  loading: Boolean
  handleChangeStep: Function
  submit: Function
}
