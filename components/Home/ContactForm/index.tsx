/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input
} from 'reactstrap'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  organisationName: '',
  email: '',
  message: ''
})

const ContactForm = (props: Props & FormikProps<FormValues>) => (
  <Form className='mt-5' css={styles(props.theme)}>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for='firstName' className='monospace'>
            First Name
          </Label>
          <Input
            type='text'
            bsSize='lg'
            tag={Field}
            placeholder='John'
            id='firstName'
            name='firstName'
            value={props.values.firstName}
            invalid={props.errors.firstName && props.touched.firstName}
            className='rounded-0 text-primary border-secondary'
          />
          <FormFeedback>{props.errors.firstName}</FormFeedback>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for='lastName' className='monospace'>
            Last Name
          </Label>
          <Input
            type='text'
            bsSize='lg'
            tag={Field}
            placeholder='Doe'
            id='lastName'
            name='lastName'
            value={props.values.lastName}
            invalid={props.errors.lastName && props.touched.lastName}
            className='rounded-0 text-primary border-secondary'
          />
          <FormFeedback>{props.errors.lastName}</FormFeedback>
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label for='organisationName' className='monospace'>
        Organisation Name
      </Label>
      <Input
        type='text'
        bsSize='lg'
        tag={Field}
        placeholder='Coders for Causes'
        id='organisationName'
        name='organisationName'
        value={props.values.organisationName}
        invalid={
          props.errors.organisationName && props.touched.organisationName
        }
        className='rounded-0 text-primary border-secondary'
      />
      <FormFeedback>{props.errors.organisationName}</FormFeedback>
      {!props.errors.organisationName && (
        <FormText>
          If you do not have a name for your organisation, then please enter
          'N/A'.
        </FormText>
      )}
    </FormGroup>
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
        className='rounded-0 text-primary border-secondary'
      />
      <FormFeedback>{props.errors.email}</FormFeedback>
    </FormGroup>
    <FormGroup>
      <Label for='message' className='monospace'>
        Message
      </Label>
      <Input
        type='textarea'
        bsSize='lg'
        placeholder='Write a short message here to get things started'
        id='message'
        name='message'
        value={props.values.message}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        invalid={props.errors.message && props.touched.message}
        className='rounded-0 text-primary border-secondary text-area'
      />
      <FormFeedback>{props.errors.message}</FormFeedback>
    </FormGroup>
    <div className='d-flex justify-content-between'>
      <Button
        type='submit'
        outline
        size='lg'
        color='secondary'
        className='rounded-0 monospace px-5'
      >
        Send
      </Button>
      <Button
        size='lg'
        color='link'
        className='rounded-0 monospace px-5 text-secondary'
        onClick={props.handleCloseForm}
      >
        Close
      </Button>
    </div>
  </Form>
)

export default withTheme(
  withFormik<Props, FormValues>({
    handleSubmit: async values => {},
    mapPropsToValues,
    validationSchema
  })(ContactForm)
)

interface FormValues {
  firstName: string
  lastName: string
  organisationName: string
  email: string
  message: string
}
interface Props {
  theme: Object
  handleCloseForm: Function
}
