import React, { useState, useContext, useCallback } from 'react'
import { Auth } from '@aws-amplify/auth'
import {
  Container,
  Button,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import Router from 'next/router'
import { phemeLogin } from 'helpers/phemeLogin'
import { UserContext, DarkContext } from 'helpers/user'

import Title from 'components/Utils/Title'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'

const SignInPage = (props: { route?: string; signUp: Function }) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')

  const { setUser } = useContext(UserContext)
  const isDark = useContext(DarkContext)

  const closeError = useCallback(() => setErrors(''), [])
  const goToSignUpPage = useCallback(
    e => {
      e.preventDefault()
      props.signUp(true)
    },
    [props.signUp]
  )
  const setUWAStudent = useCallback(() => setIsUWAStudent(true), [])
  const setNotUWAStudent = useCallback(() => setIsUWAStudent(false), [])

  const handleSubmit = useCallback(async values => {
    setLoading(true)
    const data = {
      username: values.email,
      password: values.password
    }
    try {
      if (isUWAStudent) {
        const phemeResponse = await phemeLogin(
          values.studentNumber,
          values.password,
          `${process.env.NEXT_PUBLIC_PHEME_URL}api/login`,
          process.env.NEXT_PUBLIC_PHEME_TOKEN
        )

        if (!phemeResponse.success) throw new Error(phemeResponse.message)

        // reassign data to use values fetched from pheme login
        data.username = `${values.studentNumber}@student.uwa.edu.au`
        data.password = `${values.studentNumber}${process.env.NEXT_PUBLIC_PHEME_SALT}`
      }
      const response = await Auth.signIn(data.username, data.password)
      setUser(response.attributes)
      Router.replace(props.route ? props.route : '/dashboard')
    } catch ({ code, message }) {
      if (code === 'UserNotConfirmedException') {
        setErrors(
          'To login into Coders for Causes, please click on the verification link sent to your email and try again.'
        )
      }
      setErrors(
        message ||
          'An unexpected error occurred. Please refresh the page and try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div>
      <Title typed>./sign-in</Title>
      <Container className='py-5 '>
        <Row>
          <Col xs={12} tag='p'>
            Don't have an account?&nbsp;
            <Button
              color='link'
              className={`px-0 mt-n1 rounded-0 text-${
                isDark ? 'secondary' : 'primary'
              }`}
              onClick={goToSignUpPage}
            >
              Create one
            </Button>
            .
          </Col>
          <Col md={6}>
            <Nav tabs className='border-0'>
              <NavItem className='mr-2'>
                <NavLink
                  disabled={loading}
                  tag='button'
                  className={`tab-nav rounded-0 text-${
                    isDark ? 'secondary' : 'primary'
                  } ${
                    isUWAStudent
                      ? `${
                          isDark
                            ? 'border-secondary text-secondary'
                            : 'border-primary text-primary'
                        }`
                      : null
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
                  className={`tab-nav rounded-0 text-${
                    isDark ? 'secondary' : 'primary'
                  } ${
                    !isUWAStudent
                      ? `${
                          isDark
                            ? 'border-secondary text-secondary'
                            : 'border-primary text-primary'
                        }`
                      : null
                  }`}
                  onClick={setNotUWAStudent}
                >
                  Email Sign-in
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={isUWAStudent ? 1 : 2}>
              <TabPane tabId={1} className='pt-3'>
                <UWAStudent
                  loading={loading}
                  error={errors}
                  closeError={closeError}
                  handleSubmit={handleSubmit}
                />
              </TabPane>
              <TabPane tabId={2} className='pt-3'>
                <OtherMember
                  loading={loading}
                  error={errors}
                  closeError={closeError}
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
      </Container>
    </div>
  )
}

export default SignInPage
