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
import Title from '../../Utils/Title'
import UWAStudent from './UWAStudent'
import OtherMember from './OtherMember'
import { styles } from './styles'

const SignInPage = (props: { theme: Object }) => {
  const [isUWAStudent, setIsUWAStudent] = useState(true)
  return (
    <div css={styles(props.theme)}>
      <Title typed>./sign-in</Title>
      <Container className='py-5 '>
        <Row>
          <Col md={6}>
            <Nav tabs className='border-0'>
              <NavItem className='mr-2'>
                <NavLink
                  className={`signin-tab rounded-0 ${
                    isUWAStudent && 'border-dark'
                  }`}
                  onClick={() => setIsUWAStudent(true)}
                >
                  UWA Student
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`signin-tab rounded-0 ${
                    !isUWAStudent && 'border-dark'
                  }`}
                  onClick={() => setIsUWAStudent(false)}
                >
                  Email Sign-in
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={isUWAStudent ? 1 : 2}>
              <TabPane tabId={1} className='pt-3'>
                <UWAStudent />
              </TabPane>
              <TabPane tabId={2} className='pt-3'>
                <OtherMember />
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

export default withTheme(SignInPage)
