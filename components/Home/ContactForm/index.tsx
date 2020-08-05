/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input
} from 'reactstrap'
import Spinner from 'components/Elements/Spinner'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  organisationName: '',
  email: '',
  message: ''
})

const ContactForm = (props: Props & FormikProps<FormValues>) => {
  const theme = useTheme()

  return (
    <Form className='mt-5' css={styles(theme)}>
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
              disabled={props.loading}
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
              disabled={props.loading}
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
          disabled={props.loading}
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
            {/* Added span as reactstrap injects classes after classes declared in FormText */}
            <span className='text-secondary'>
              If you do not have a name for your organisation, then please enter
              'N/A'.
            </span>
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
          disabled={props.loading}
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
          disabled={props.loading}
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
          disabled={props.loading}
          className='rounded-0 monospace px-5 d-flex align-items-center'
        >
          Send
          {props.loading && (
            <Spinner color='secondary' size='sm' className='ml-2' />
          )}
        </Button>
        <Button
          size='lg'
          color='link'
          disabled={props.loading}
          className='rounded-0 monospace px-5 text-secondary'
          onClick={props.handleCloseForm}
        >
          Close
        </Button>
      </div>
    </Form>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
  mapPropsToValues,
  validationSchema
})(ContactForm)

interface FormValues {
  firstName: string
  lastName: string
  organisationName: string
  email: string
  message: string
}
interface Props {
  loading: boolean
  handleCloseForm: Function
  handleSubmit: Function
}
