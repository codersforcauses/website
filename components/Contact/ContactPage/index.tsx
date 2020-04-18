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
import Title from '../../Utils/Title'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  organisationName: '',
  email: '',
  message: ''
})

const BrandPage = (props: Props & FormikProps<FormValues>) => (
  <div css={styles(props.theme)}>
    <Title typed>./contact us</Title>
    <Container className='py-5 my-5'>
      <Row>
        <Col lg={7}>
          <Form>
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
                    className='rounded-0 text-dark border-dark'
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
                    className='rounded-0 text-dark border-dark'
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
                  props.errors.organisationName &&
                  props.touched.organisationName
                }
                className='rounded-0 text-dark border-dark'
              />
              <FormFeedback>{props.errors.organisationName}</FormFeedback>
              {!props.errors.organisationName && (
                <FormText>
                  If you do not have a name for your organisation, then please
                  enter 'N/A'.
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
                className='rounded-0 text-dark border-dark'
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
                className='rounded-0 text-dark border-dark text-area'
              />
              <FormFeedback>{props.errors.message}</FormFeedback>
            </FormGroup>
            <Button
              type='submit'
              size='lg'
              color='primary'
              className='rounded-0 monospace px-5'
            >
              Send
            </Button>
          </Form>
        </Col>
        <Col
          lg={{ size: 4, offset: 1 }}
          className='d-none d-lg-flex align-items-center'
        >
          <img
            src='/illustrations/contact_us.svg'
            alt='Coder Coding'
            className='img-fluid'
          />
        </Col>
      </Row>
    </Container>
  </div>
)

export default withTheme(
  withFormik<Props, FormValues>({
    handleSubmit: async values => {},
    mapPropsToValues,
    validationSchema
  })(BrandPage)
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
}
