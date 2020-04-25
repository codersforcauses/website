/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useContext } from 'react'
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
import Title from 'components/Utils/Title'
import Avatar from 'components/Elements/Avatar'
import { UserContext } from 'helpers/user'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const BrandPage = (props: Props & FormikProps<FormValues>) => {
  const { user } = useContext(UserContext)
  return (
    <div css={styles(props.theme)}>
      <Title typed>./account settings</Title>
      <Container>
        <Avatar
          dark
          name={`${user?.given_name} ${user?.family_name}`} // eslint-disable-line
          size='lg'
          className='avatar'
        />
      </Container>
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
                color='primary'
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
  email: string
  password: string
  confirmPassword: string
}
interface Props {
  theme: Object
}
