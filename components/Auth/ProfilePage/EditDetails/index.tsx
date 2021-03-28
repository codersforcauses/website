import React, { useCallback, useContext, useState } from 'react'
import { Field, FormikProps, Form, withFormik } from 'formik'
import {
  Button,
  Collapse,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input,
  UncontrolledAlert
} from 'reactstrap'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import Spinner from 'components/Elements/Spinner'
import { DarkContext, User } from 'helpers/user'
import { validationSchema } from './validation'
import Socials from '../Socials'

dayjs.extend(localeData)

const mapPropsToValues = (props: Props): FormValues => ({
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
  }
})

const Days = () => (
  <>
    {new Array(31).fill(0).map((_, index) => (
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

const EditDetails = (props: Props & FormikProps<FormValues>) => {
  const [isSocialOpen, setIsSocialOpen] = useState(false)
  const toggle = useCallback(() => setIsSocialOpen(prev => !prev), [])

  const isDark = useContext(DarkContext)
  const isPheme = props.user.signUpType === 'pheme'

  return (
    <Form>
      <UncontrolledAlert
        isOpen={!!props.error}
        toggle={props.closeError}
        color='danger'
        className='rounded-0'
      >
        {props.error}
      </UncontrolledAlert>
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
              invalid={props.errors.firstName && props.touched.firstName}
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
          disabled={isPheme}
          value={props.values.email}
          invalid={props.errors.email && props.touched.email}
          className={`rounded-0 text-primary border-primary ${
            isPheme ? 'user-select-none' : null
          }`}
        />
        {isPheme && (
          <FormText className='user-select-none'>
            This field is disabled due to pheme sign-up
          </FormText>
        )}
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
          {props.values.bio.length}/512
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
      <Collapse isOpen={!isSocialOpen}>
        <Button
          block
          size='lg'
          color='success'
          className='rounded-0 text-monospace px-4 mb-4 d-lg-none'
          onClick={toggle}
        >
          Link Socials
        </Button>
      </Collapse>
      <Collapse isOpen={isSocialOpen}>
        <Socials isEditing />
        <div className='my-3 d-flex flex-row-reverse'>
          <Button
            size='lg'
            color='link'
            className={`rounded-0 text-monospace text-${
              isDark ? 'secondary' : 'primary'
            }`}
            onClick={toggle}
          >
            Close
          </Button>
        </div>
      </Collapse>
      <div className='d-flex align-items-center justify-content-between'>
        <Button
          type='submit'
          size='lg'
          outline={isDark}
          color={isDark ? 'secondary' : 'primary'}
          className='rounded-0 text-monospace px-4 d-flex align-items-center'
        >
          Update
        </Button>
        <Button
          size='lg'
          color='link'
          className={`rounded-0 text-monospace text-${
            isDark ? 'secondary' : 'primary'
          }`}
          onClick={props.handleCancel}
        >
          Cancel
          {props.loading && (
            <Spinner color='secondary' size='sm' className='ml-2' />
          )}
        </Button>
      </div>
    </Form>
  )
}
export default withFormik<Props, FormValues>({
  handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag),
  mapPropsToValues,
  validationSchema
})(EditDetails)

interface FormValues {
  firstName: string
  lastName: string
  email: string
  bio: string
  isGuildMember: boolean
  gender: string
  dob: {
    day: number
    month: string
    year: number
  }
}
interface Props {
  user: User
  loading: boolean
  error: string
  closeError: Function
  handleCancel: Function
  handleSubmit: Function
}
