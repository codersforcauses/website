import React from 'react'
import { Container } from 'reactstrap'
import PageContainer from '../components/PageContainer'
import Title from '../components/Utils/Title'

const Error = ({ statusCode }: { statusCode: any }) => (
  <PageContainer>
    {statusCode && <Title typed>{`./a ${statusCode} error occurred`}</Title>}
    <Container className='py-5'>
      {!statusCode && 'An error occurred on client'}
    </Container>
  </PageContainer>
)

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
