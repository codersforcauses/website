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
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import Avatar from 'components/Elements/Avatar'
import Socials from './Socials'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import { validationSchema } from './validation'

dayjs.extend(localeData)

const mapPropsToValues = (props: Props) => ({
  firstName: props.user?.firstName ?? '',
  lastName: props.user?.lastName ?? '',
  email: props.user?.email ?? '',
  bio: props.user?.bio ?? '',
  gender: props.user?.gender ?? 'other',
  isGuildMember: props.user?.isGuildMember ?? false,
  dob: {
    day: 1,
    month: 'January',
    year: 2000
  },
  password: '',
  confirmPassword: ''
})

const Days = () => (
  <>
    {new Array(31).fill(0).map((el, index) => (
      <option key={index}>{index + 1}</option>
    ))}
  </>
)
const Months = () => (
  <>
    {dayjs.months().map(el => (
      <option key={el}>{el}</option>
    ))}
  </>
)

// generate years since 1970
const Years = () => (
  <>
    {Array.from({ length: dayjs().diff('1970', 'y') }, (_, i) => 1970 + i)
      .sort((a, b) => b - a)
      .map(el => (
        <option key={el}>{el}</option>
      ))}
  </>
)

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
              <FormGroup className='position-relative'>
                <Label for='message' className='text-monospace'>
                  Date of Birth
                </Label>
                <Row form>
                  <Col xs={3}>
                    <Input
                      type='select'
                      bsSize='lg'
                      id='day'
                      name='dob.day'
                      value={props.values.dob.day}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className='rounded-0 text-primary border-primary'
                    >
                      <Days />
                    </Input>
                  </Col>
                  <Col xs={5}>
                    <Input
                      type='select'
                      bsSize='lg'
                      id='month'
                      name='dob.month'
                      value={props.values.dob.month}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className='rounded-0 text-primary border-primary'
                    >
                      <Months />
                    </Input>
                  </Col>
                  <Col xs={4}>
                    <Input
                      type='select'
                      bsSize='lg'
                      id='year'
                      name='dob.year'
                      value={props.values.dob.year}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className='rounded-0 text-primary border-primary'
                    >
                      <Years />
                    </Input>
                  </Col>
                </Row>
                <FormFeedback>{props.errors.dob}</FormFeedback>
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
            <Socials isEditing={false} />
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
  bio: string
  password: string
  confirmPassword: string
  isGuildMember: boolean
  gender: 'male' | 'female' | 'other'
  dob: {
    day:
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 16
      | 17
      | 18
      | 19
      | 20
      | 21
      | 22
      | 23
      | 24
      | 25
      | 26
      | 27
      | 28
      | 29
      | 30
      | 31
    month:
      | 'January'
      | 'February'
      | 'March'
      | 'April'
      | 'May'
      | 'June'
      | 'July'
      | 'August'
      | 'September'
      | 'October'
      | 'November'
      | 'December'
    year: number
  }
}
interface Props {
  user: any
}
