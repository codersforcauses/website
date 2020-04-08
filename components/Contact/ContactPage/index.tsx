/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import Title from '../../Utils/Title'
import { styles } from './style'

const BrandPage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Title typed>./contact us</Title>
    <Container className='py-5'>
      <Row>
        <Col lg={8}>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for='firstName' className='monospace'>
                    First Name
                  </Label>
                  <Input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='John'
                    size='lg'
                    className='rounded-0 border-dark'
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for='lastName' className='monospace'>
                    Last Name
                  </Label>
                  <Input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Doe'
                    size='lg'
                    className='rounded-0 border-dark'
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for='organisationName' className='monospace'>
                Organisation Name
              </Label>
              <Input
                type='text'
                name='organisationName'
                id='organisationName'
                placeholder='Coders for Causes'
                size='lg'
                className='rounded-0 border-dark'
              />
            </FormGroup>
            <FormGroup>
              <Label for='email' className='monospace'>
                Email
              </Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='hello@codersforcauses.org'
                size='lg'
                className='rounded-0 border-dark'
              />
            </FormGroup>
            <FormGroup>
              <Label for='message' className='monospace'>
                Message
              </Label>
              <Input
                type='textarea'
                name='message'
                id='message'
                placeholder='Write a short message here to get things started'
                size='lg'
                className='rounded-0 border-dark text-area'
              />
            </FormGroup>
            <Button
              size='lg'
              color='primary'
              className='w-25 rounded-0 monospace'
            >
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>
)

export default withTheme(BrandPage)
