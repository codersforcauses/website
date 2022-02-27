import { memo, useEffect, useState } from 'react'
import Modal from '@elements/Modal'
import { ModalProps, User } from '@helpers/types'
import { Button, GhostButton } from '@elements/Button'
import Avatar from '@elements/Avatar'
import RoleTags from '../../RoleTags'

const DeleteUserModal = ({ user: id, ...props }: DeleteModalProps) => {
  const [user, setUser] = useState<User>(null)
  useEffect(() => {
    const getUser = async () => {
      setUser(await (await fetch(`/api/users?clerkID=${id}`)).json())
    }
    id && getUser()
  }, [id])

  const gender = user?.gender === 'other' ? 'transgender' : user?.gender

  return (
    <Modal
      size='xl'
      heading='Delete User'
      open={props.isOpen}
      onClose={props.closeModal}
    >
      {user && (
        <div className='space-y-4'>
          <div className='flex space-x-2 md:space-x-4'>
            <div>
              <Avatar size='md' name={user.name} className='md:hidden' />
              <Avatar
                size='lg'
                name={user.name}
                className='hidden m-0 md:flex'
              />
            </div>
            <div className='flex flex-col w-11/12 space-y-1 md:space-y-2'>
              <p className='flex items-center w-11/12 font-mono text-xl font-black truncate md:text-3xl'>
                {user.name}
                <i className='ml-2 select-none material-icons-sharp'>
                  {gender}
                </i>
              </p>
              <p className='w-11/12 font-mono truncate md:text-lg text-primary/75 dark:text-secondary/75'>
                {user.email}
              </p>
              <div className='flex w-11/12 gap-2'>
                {user.roles?.map(role => (
                  <RoleTags key={role} role={role} />
                ))}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <p className='col-span-2'>{user.bio}</p>
            <div>
              <div className='p-2 bg-accent'>hello</div>
            </div>
          </div>
          <div className='font-mono text-xs text-primary/75 dark:text-secondary/75'>
            <div>Created on {user.createdAt}</div>
            <div>Last updated on {user.updatedAt}</div>
          </div>
          <div className='flex justify-between'>
            <GhostButton disabled={props.loading} onClick={props.closeModal}>
              Cancel
            </GhostButton>
            <Button
              color='danger'
              loading={props.loading}
              onClick={props.handleSubmit}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

interface DeleteModalProps extends ModalProps {
  user: string
  loading: boolean
  handleSubmit: () => void
}

export default memo(DeleteUserModal)
