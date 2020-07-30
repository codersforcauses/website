import React from 'react'
import { Container } from 'reactstrap'
import Title from 'components/Utils/Title'

const Error = ({ statusCode }: { statusCode: any }) => (
  <>
    {statusCode && <Title typed>{`./a ${statusCode} error occurred`}</Title>}
    <Container className='py-5'>
      {!statusCode && 'An error occurred on client'}
    </Container>
  </>
)

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
