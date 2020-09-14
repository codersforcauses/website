import React, { useCallback, useState } from 'react'
import Router from 'next/router'
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import { Auth } from '@aws-amplify/auth'
import { phemeLogin } from 'helpers/phemeLogin'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'

// eslint-disable-next-line react/no-unused-prop-types
const Step1 = (props: { signIn: Function; nextStep: Function }) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')

  const closeError = useCallback(() => setErrors(''), [])
  const setUWAStudent = useCallback(() => setIsUWAStudent(true), [])
  const setNotUWAStudent = useCallback(() => setIsUWAStudent(false), [])

  const handleSubmit = useCallback(async values => {
    setLoading(true)
    const data = {
      username: values?.email,
      password: values?.password,
      attributes: {
        given_name: values?.firstName,
        family_name: values?.lastName
      }
    }
    try {
      if (isUWAStudent) {
        const phemeResponse = await phemeLogin(
          values.studentNumber,
          values.password,
          `${process.env.PHEME_URL}api/login`,
          process.env.PHEME_TOKEN
        )

        if (!phemeResponse.success) throw new Error(phemeResponse.message)

        const user = phemeResponse.user

        // reassign data to use values fetched from pheme login
        data.username = `${values.studentNumber}@student.uwa.edu.au`
        data.password = `${values.studentNumber}${process.env.PHEME_SALT}`
        data.attributes.given_name = user.firstname.split(' ')[0]
        data.attributes.family_name = user.lastname
      }
      const response = await Auth.signUp(data)
      // console.log(response)
      // props.nextStep()
      Router.push('/')
    } catch (error) {
      setErrors(
        error.message ||
          'An unexpected error occurred. Please refresh the page and try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [])
  return (
    <Row>
      <Col xs={12} tag='p'>
        Already have an account?&nbsp;
        <a
          href=''
          onClick={e => {
            e.preventDefault()
            props.signIn(false)
          }}
        >
          Sign in
        </a>
        .
      </Col>
      <Col md={6}>
        <Nav tabs className='border-0'>
          <NavItem className='mr-2'>
            <NavLink
              disabled={loading}
              tag='button'
              className={`tab-nav rounded-0 ${
                isUWAStudent ? 'border-primary' : null
              }`}
              onClick={setUWAStudent}
            >
              UWA Student
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={loading}
              tag='button'
              className={`tab-nav rounded-0 ${
                !isUWAStudent ? 'border-primary' : null
              }`}
              onClick={setNotUWAStudent}
            >
              Email Sign-up
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={isUWAStudent ? 1 : 2}>
          <TabPane tabId={1} className='pt-3'>
            <UWAStudent
              error={errors}
              closeError={closeError}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </TabPane>
          <TabPane tabId={2} className='pt-3'>
            <OtherMember
              error={errors}
              closeError={closeError}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </TabPane>
        </TabContent>
      </Col>
      <Col
        md={{ size: 5, offset: 1 }}
        className='d-none d-md-flex align-items-center'
      >
        <img
          src='/illustrations/sign_in.svg'
          alt='Coder Coding'
          className='img-fluid'
        />
      </Col>
    </Row>
  )
}

export default Step1
