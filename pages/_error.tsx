import { Container } from 'reactstrap'
import PageContainer from '../components/PageContainer'

const Error = ({ statusCode }) => (
  <PageContainer>
    <Container className='py-5'>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </Container>
  </PageContainer>
)

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
