/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { memo, useCallback, useContext, useState } from 'react'
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap'
import Avatar from 'components/Elements/Avatar'
import { DarkContext, User } from 'helpers/user'
import EditDetails from './EditDetails'
import Socials from './Socials'
import { styles } from './styles'

const ProfilePage = (props: Props) => {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const theme = useTheme()
  const isDark = useContext(DarkContext)

  const toggleEdit = useCallback(() => setEditing(prev => !prev), [])
  const closeError = useCallback(() => setError(''), [])
  const handleSubmit = useCallback(async values => {
    setLoading(true)
    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}users/${props.user._id}`
      // )
      // const {
      //   data: [user]
      // } = await res.json()
      // console.log(values, props.user._id)
    } catch ({ message }) {
      setError(message)
    } finally {
      setLoading(false)
      setError('')
    }
  }, [])

  return (
    <div css={styles(theme)}>
      <Jumbotron className='bg-primary rounded-0 py-5 m-0'>
        <Container className='my-5 py-4 text-secondary text-monospace'>
          ./profile
        </Container>
      </Jumbotron>
      <Container className='d-flex align-items-center'>
        <Avatar dark name={props.user?.name} size='lg' className='avatar' />
        {!editing && (
          <>
            <div className='ml-3'>
              {props.user?.firstName} {props.user?.lastName}
            </div>
            {props.canEdit && (
              <Button
                color='link'
                className={`rounded-0 text-${isDark ? 'secondary' : 'primary'}`}
                onClick={toggleEdit}
              >
                <i className='material-icons-sharp'>edit</i>
              </Button>
            )}
          </>
        )}
      </Container>
      <Container className='py-5'>
        <Row>
          <Col lg={7}>
            {editing ? (
              <EditDetails
                user={props.user}
                loading={loading}
                error={error}
                closeError={closeError}
                handleCancel={toggleEdit}
                handleSubmit={handleSubmit}
              />
            ) : (
              <>
                {props.user?.bio && <p>{props.user?.bio}</p>}
                <p>
                  Jeremiah Pinto is a god tier programmer and software
                  developer, he writes the cleanest code at Coders For Causes .
                  But he is not a great programmer and is not known for it. When
                  people hear that he is a god tier programmer they assume that
                  he is the best developer, but they don't know about his
                  programming background. I was lucky enough to meet him at a
                  conference and got a chance to speak at a conference about
                  computer security, security conferences have really helped me
                  learn about security. After that I started to work with him
                  and started to learn about his work for Coders For Causes.
                  After a while I started to share and help with his development
                  work. At Coders For Causes I learned a lot about software
                  security. We use SELinux security to enforce what is allowed
                  by SELinux, this helps us to write better software, secure it,
                  and protect users from security flaws. Jeremiah has a lot of
                  code for Coders For Causes and a lot of work that he
                  contributes to Coders For Causes from a security standpoint.
                  We also use his Code of Conduct which is a great template in
                  terms of code style. Some of the code he produces for Coders
                  For Causes is considered dirty and shouldn't see the light of
                  day, but I love it.
                </p>
              </>
            )}
          </Col>
          <Col lg={{ size: 4, offset: 1 }}>
            <Socials isEditing={editing} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProfilePage

interface Props {
  user: User
  canEdit: boolean
}
