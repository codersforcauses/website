/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useContext } from 'react'
import { Auth } from '@aws-amplify/auth'
import {
  Container,
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
import { UserContext } from 'helpers/user'
import Title from 'components/Utils/Title'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'
import { styles } from './styles'

const SignInPage = (props: { route?: string; signUp: Function }) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')

  const { setUser } = useContext(UserContext)

  const theme = useTheme()

  const closeError = () => setErrors('')

  const handleSubmit = async values => {
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
          `${process.env.PHEME_URL}api/login`,
          process.env.PHEME_TOKEN
        )

        if (!phemeResponse.success) throw new Error(phemeResponse.message)

        // reassign data to use values fetched from pheme login
        data.username = `${values.studentNumber}@student.uwa.edu.au`
        data.password = `${values.studentNumber}${process.env.PHEME_SALT}`
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
  }

  return (
    <div css={styles(theme)}>
      <Title typed>./sign-in</Title>
      <Container className='py-5 '>
        <Row>
          <Col xs={12} tag='p'>
            Don't have an account?&nbsp;
            <a
              href=''
              onClick={e => {
                e.preventDefault()
                props.signUp(true)
              }}
            >
              Create one
            </a>
            .
          </Col>
          <Col md={6}>
            <Nav tabs className='border-0'>
              <NavItem className='mr-2'>
                <NavLink
                  disabled={loading}
                  className={`signin-tab rounded-0 ${
                    isUWAStudent && 'border-primary'
                  }`}
                  onClick={() => setIsUWAStudent(true)}
                >
                  UWA Student
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={loading}
                  className={`signin-tab rounded-0 ${
                    !isUWAStudent && 'border-primary'
                  }`}
                  onClick={() => setIsUWAStudent(false)}
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
