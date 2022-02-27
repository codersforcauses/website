import { memo, useCallback, useState } from 'react'
import Avatar from '@elements/Avatar'
import { User } from '@helpers/types'
import EditDetails from './EditDetails'
import Socials from './Socials'

const ProfilePage = ({ user, ...props }: ProfileProps) => {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      setError(message as string)
    } finally {
      setLoading(false)
      setError('')
    }
  }, [])

  return (
    <>
      <div className='py-6 h-36 bg-primary'>
        <div className='container px-3 mx-auto font-mono text-secondary'>
          ./profile
        </div>
      </div>
      <div className='bg-secondary dark:bg-alt-dark'>
        {!editing && (
          <div className='container flex items-center px-3 mx-auto space-x-3'>
            <Avatar name={user.name} size='lg' className='-mt-16' />
            <p className='text-xl'>{user.name}</p>
            {props.canEdit && (
              <button
                className='flex place-items-center focus:outline-none focus:ring-1 focus:ring-accent'
                onClick={toggleEdit}
              >
                <i className='material-icons-sharp'>edit</i>
              </button>
            )}
          </div>
        )}
        <div className='container px-3 py-12 mx-auto lg:grid lg:grid-cols-3 lg:gap-16'>
          <div className='col-span-2'>
            {editing ? (
              <EditDetails
                user={user}
                loading={loading}
                error={error}
                closeError={closeError}
                handleCancel={toggleEdit}
                handleSubmit={handleSubmit}
              />
            ) : (
              <p>
                {user.bio ? (
                  user.bio
                ) : (
                  <>
                    Jeremiah Pinto is a god tier programmer and software
                    developer, he writes the cleanest code at Coders For Causes.
                    But he is not a great programmer and is not known for it.
                    When people hear that he is a god tier programmer they
                    assume that he is the best developer, but they don&apos;t
                    know about his programming background. I was lucky enough to
                    meet him at a conference and got a chance to speak at a
                    conference about computer security, security conferences
                    have really helped me learn about security.
                  </>
                )}
              </p>
            )}
          </div>
          <Socials isEditing={editing} />
        </div>
      </div>
    </>
  )
}

interface ProfileProps {
  user: NonNullable<User>
  canEdit: boolean
}

export default memo(ProfilePage)
