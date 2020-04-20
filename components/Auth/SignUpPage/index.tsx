/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
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
import { Auth } from 'aws-amplify'
import Link from 'next/link'
import Router from 'next/router'
import Title from '../../Utils/Title'
import { phemeLogin } from '../../../helpers/phemeLogin'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'
import { styles } from './styles'

const SignUpPage = (props: { theme: Object }) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')

  const closeError = () => setErrors('')

  const handleSubmit = async values => {
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

        // eslint-disable-next-line
        if (!phemeResponse.success) throw { message: phemeResponse.message }

        const user = phemeResponse.user

        // reassign data to use values fetched from pheme login
        data.username = `${values.studentNumber}@student.uwa.edu.au`
        data.password = `${values.studentNumber}${process.env.PHEME_SALT}`
        data.attributes.given_name = user.firstname.split(' ')[0]
        data.attributes.family_name = user.lastname
      }
      const response = await Auth.signUp(data)
      // console.log(response)
      Router.push('/dashboard')
    } catch (error) {
      setErrors(
        error.message ||
          'An unexpected error occurred. Please refresh the page and try again.'
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div css={styles(props.theme)}>
      <Title typed>./sign-up</Title>
      <Container className='py-5 '>
        <Row>
          <Col xs={12} tag='p'>
            Already have an account? Sign in&nbsp;
            <Link href='/signin'>
              <a>here</a>
            </Link>
            !
          </Col>
          <Col md={6}>
            <Nav tabs className='border-0'>
              <NavItem className='mr-2'>
                <NavLink
                  className={`signup-tab rounded-0 ${
                    isUWAStudent && 'border-primary'
                  }`}
                  onClick={() => setIsUWAStudent(true)}
                >
                  UWA Student
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`signup-tab rounded-0 ${
                    !isUWAStudent && 'border-primary'
                  }`}
                  onClick={() => setIsUWAStudent(false)}
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
      </Container>
    </div>
  )
}

export default withTheme(SignUpPage)
