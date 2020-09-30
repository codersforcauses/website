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
import Socials from './Socials'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import { validationSchema } from './validation'

const mapPropsToValues = (props: Props) => ({
  firstName: props.user?.firstName ?? '',
  lastName: props.user?.lastName ?? '',
  email: props.user?.email ?? '',
  bio: props.user?.bio ?? '',
  gender: props.user?.gender ?? 'other',
  isGuildMember: props.user?.isGuildMember ?? false,
  password: '',
  confirmPassword: ''
})

const AccountSettingsPage = (props: Props & FormikProps<FormValues>) => {
  const theme = useTheme()
  const isDark = useContext(DarkContext)
  return (
    <div css={styles(theme)}>
      <Jumbotron className='bg-primary rounded-0 py-5 m-0'>
        <Container className='my-5 py-4 text-secondary text-monospace'>
          ./account_settings
        </Container>
      </Jumbotron>
      <Container className='d-flex align-items-center'>
        <Avatar
          dark
          name={`${props.user?.firstName} ${props.user?.lastName}`}
          size='lg'
          className='avatar'
        />
        <div className='ml-3'>
          {props.user?.firstName} {props.user?.lastName}
        </div>
      </Container>
      <Container className='py-5'>
        <Row>
          <Col lg={7}>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='firstName' className='text-monospace'>
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
                    <Label for='lastName' className='text-monospace'>
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
                <Label for='email' className='text-monospace'>
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
              <FormGroup className='position-relative'>
                <Label for='message' className='text-monospace'>
                  Bio
                </Label>
                <Input
                  type='textarea'
                  bsSize='lg'
                  placeholder='Tell us about yourself'
                  id='bio'
                  name='bio'
                  value={props.values.bio}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  invalid={props.errors.bio && props.touched.bio}
                  className='rounded-0 text-primary border-primary text-area'
                />
                <FormText className='counter user-select-none'>
                  {props.values.bio.length}/2048
                </FormText>
                <FormFeedback>{props.errors.bio}</FormFeedback>
              </FormGroup>
              <FormGroup className='d-flex align-items-center justify-content-between text-monospace'>
                Gender:
                <Label check>
                  <Input
                    type='radio'
                    tag={Field}
                    name='gender'
                    value='male'
                    checked={props.values.gender}
                  />
                  Male
                </Label>
                <Label check>
                  <Input
                    type='radio'
                    tag={Field}
                    name='gender'
                    value='female'
                    checked={props.values.gender}
                  />
                  Female
                </Label>
                <Label check>
                  <Input
                    type='radio'
                    tag={Field}
                    name='gender'
                    value='other'
                    checked={props.values.gender}
                  />
                  Other
                </Label>
              </FormGroup>
              <FormGroup check className='mb-3'>
                <Label check>
                  <Input
                    type='checkbox'
                    tag={Field}
                    id='isGuildMember'
                    name='isGuildMember'
                    checked={props.values.isGuildMember}
                  />
                  I am a{' '}
                  <a
                    href='https://www.uwastudentguild.com/the-guild/join-us'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`text-${isDark ? 'secondary' : 'primary'}`}
                  >
                    UWA Guild Member
                  </a>
                </Label>
              </FormGroup>
              <Button
                type='submit'
                size='lg'
                outline={isDark}
                color={isDark ? 'secondary' : 'primary'}
                className='rounded-0 text-monospace'
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col lg={{ size: 4, offset: 1 }}>
            <Socials />
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
  bio: string
  gender: 'male' | 'female' | 'other'
  isGuildMember: boolean
}
interface Props {
  user: any
}
