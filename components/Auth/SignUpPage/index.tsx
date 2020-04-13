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
import Link from 'next/link'
import Title from '../../Utils/Title'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'
import { styles } from './styles'

const SignUpPage = (props: { theme: Object }) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async values => {
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
    }, 2000)
  }
  return (
    <div css={styles(props.theme)}>
      <Title typed>./sign-up</Title>
      <Container className='py-5 '>
        <Row>
          <Col xs={12} tag='p'>
            Already have an account? Sign in <Link href='/signin'>here</Link>!
          </Col>
          <Col md={6}>
            <Nav tabs className='border-0'>
              <NavItem className='mr-2'>
                <NavLink
                  className={`signup-tab rounded-0 ${
                    isUWAStudent && 'border-dark'
                  }`}
                  onClick={() => setIsUWAStudent(true)}
                >
                  UWA Student
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`signup-tab rounded-0 ${
                    !isUWAStudent && 'border-dark'
                  }`}
                  onClick={() => setIsUWAStudent(false)}
                >
                  Email Sign-up
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={isUWAStudent ? 1 : 2}>
              <TabPane tabId={1} className='pt-3'>
                <UWAStudent loading={loading} handleSubmit={handleSubmit} />
              </TabPane>
              <TabPane tabId={2} className='pt-3'>
                <OtherMember loading={loading} handleSubmit={handleSubmit} />
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
