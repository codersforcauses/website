/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useCallback, useContext, useState } from 'react'
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap'
import dayjs from 'dayjs'
import Avatar from 'components/Elements/Avatar'
import { DarkContext, User } from 'helpers/user'
import EditDetails from './EditDetails'
import Socials from './Socials'
import { styles } from './styles'

const ProfilePage = (props: Props) => {
  const [editing, setEditing] = useState(false)
  const theme = useTheme()
  const isDark = useContext(DarkContext)

  const toggleEdit = useCallback(() => setEditing(prev => !prev), [])

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
              <EditDetails user={props.user} handleCancel={toggleEdit} />
            ) : (
              <>
                {props.user?.bio && <p>{props.user?.bio}</p>}
                <p>hello</p>
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
