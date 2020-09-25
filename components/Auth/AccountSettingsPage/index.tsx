/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useContext } from 'react'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  Jumbotron,
  Container,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input
} from 'reactstrap'
import Avatar from 'components/Elements/Avatar'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = (props: Props) => ({
  firstName: props.user?.given_name,
  lastName: props.user?.family_name,
  email: props.user?.email,
  password: '',
  confirmPassword: ''
})

const AccountSettingsPage = (props: Props & FormikProps<FormValues>) => {
  const theme = useTheme()
  const isDark = useContext(DarkContext)
  return (
    <div css={styles(theme)}>
      <Jumbotron className='bg-primary rounded-0 py-5 m-0'>
        <Container className='my-5 py-4 text-secondary monospace'>
          ./account_settings
        </Container>
      </Jumbotron>
      <Container className='d-flex align-items-center'>
        <Avatar
          dark
          name={`${props.user?.given_name} ${props.user?.family_name}`}
          size='lg'
          className='avatar'
        />
        <div className='ml-3'>
          {props.user?.given_name} {props.user?.family_name}
        </div>
      </Container>
      <Container className='py-5'>
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
                      invalid={
                        props.errors.firstName && props.touched.firstName
                      }
                      className='rounded-0 text-primary border-primary'
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
                      className='rounded-0 text-primary border-primary'
                    />
                    <FormFeedback>{props.errors.lastName}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
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
                  className='rounded-0 text-primary border-primary'
                />
                <FormFeedback>{props.errors.email}</FormFeedback>
              </FormGroup>
              <Button
                type='submit'
                size='lg'
                outline={isDark}
                color={isDark ? 'secondary' : 'primary'}
                className='rounded-0 monospace'
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withFormik<Props, FormValues>({
  handleSubmit: async values => {},
  mapPropsToValues,
  validationSchema
})(AccountSettingsPage)

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
interface Props {
  user: any
}
