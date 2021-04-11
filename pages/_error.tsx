/** @jsxImportSource @emotion/react */
import { useTheme, css } from '@emotion/react'
import { useContext } from 'react'
import Link from 'next/link'
import { Button, Container } from 'reactstrap'
import Title from 'components/Utils/Title'
import { DarkContext } from 'helpers/user'

const styles = (theme, isDark) => css`
  display: grid;
  place-items: center;
  place-self: center;

  .idk {
    font-size: 6.5rem;
  }
`

const Error = ({ statusCode }: { statusCode: number }) => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()
  const isNotFound = statusCode === 404
  let title = `./a ${statusCode} error occurred`
  if (isNotFound) title = './page not found'

  return (
    <>
      {!isNotFound && <Title typed>{title}</Title>}
      <Container css={styles(theme, isDark)}>
        {isNotFound && (
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='idk mt-0'>¯\_(ツ)_/¯</h1>
            <h2 className='display-5 mb-4'>Page not found</h2>
            <Link href='/'>
              <Button
                outline
                color={isDark ? 'secondary' : 'primary'}
                className='rounded-0 d-flex align-items-center mt-2'
              >
                <span className='material-icons-sharp mr-2'>arrow_back</span>
                <span>I want to go home</span>
              </Button>
            </Link>
          </div>
        )}
        {!statusCode && 'An error occurred on client'}
      </Container>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode: number = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
