import { memo, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import Avatar from '@elements/Avatar'
import { GhostButton } from '@components/Elements/Button'
import { Role, User } from '@lib/types'
import { useUser } from '@lib/user'
import RoleTags from '../RoleTags'
import SearchUser from './SearchUser'
const DeleteUserModal = dynamic(() => import('./DeleteUserModal'))
const UpdateRoleModal = dynamic(() => import('./UpdateRoleModal'))

const UsersTable = () => {
  const { user: presentUser } = useUser()
  const {
    data: users,
    isValidating,
    mutate
  } = useSWR<Array<NonNullable<User>>>('/api/users?all=true', {
    refreshInterval: 60000
  })
  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState(false)
  const [userDeleteModal, setUserDeleteModal] = useState(false)
  const [updateRoleModal, setUpdateRoleModal] = useState(false)

  const refetchUsers = useCallback(() => {
    mutate()
  }, [mutate])

  const openDeleteUsersModal = useCallback(() => setUserDeleteModal(true), [])
  const closeDeleteUsersModal = useCallback(() => {
    setUserDeleteModal(false)
    setCurrentUser('')
  }, [])
  const deleteUser = useCallback(async () => {
    setLoading(true)
    try {
      await fetch(`/api/users?clerkID=${currentUser}`, {
        method: 'DELETE'
      })
      mutate()
      closeDeleteUsersModal()
    } catch (error) {
      // TODO
    } finally {
      setLoading(false)
    }
  }, [closeDeleteUsersModal, currentUser, mutate])

  const openUpdateRoleModal = useCallback(() => setUpdateRoleModal(true), [])
  const closeUpdateRoleModal = useCallback(() => {
    setUpdateRoleModal(false)
    setCurrentUser('')
  }, [])
  const updateUser = useCallback(
    async (values: Record<Role, boolean>) => {
      setLoading(true)
      try {
        const roles = Object.entries(values).reduce(
          (userRoles, [role, hasRole]) =>
            hasRole ? [...userRoles, role as Role] : userRoles,
          [] as Array<Role>
        )

        const user = users?.find(({ clerkID }) => clerkID === currentUser)

        await fetch(`/api/users/${user?._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            roles
          })
        })
        mutate()
        closeUpdateRoleModal()
      } catch (error) {
      } finally {
        setLoading(false)
      }
    },
    [closeUpdateRoleModal, currentUser, mutate, users]
  )

  return users ? (
    <>
      <div className='flex justify-between'>
        <GhostButton
          type='button'
          disabled={isValidating}
          className='flex items-center bg-alt-light dark:bg-primary'
          onClick={refetchUsers}
        >
          <span className='mr-2 material-icons-sharp'>refresh</span>
          Force refresh
        </GhostButton>
        <SearchUser />
      </div>
      <table className='w-full mt-6 overflow-x-scroll border-collapse'>
        <thead className='relative font-mono font-black text-left'>
          <tr>
            <th className='hidden p-2 md:block' />
            <th className='p-2'>Member</th>
            <th className='p-2'>Roles</th>
            <th className='p-2'>Joined On</th>
            <th className='p-2 text-center'>Manage</th>
          </tr>
          {isValidating && (
            <div className='absolute inset-x-0 bottom-0 h-1 bg-success'>
              {/* TODO progress */}
            </div>
          )}
        </thead>
        <tbody className='text-lg'>
          {users.map((user, idx) => (
            <tr key={idx} className='dark:odd:bg-primary odd:bg-alt-light'>
              <td className='flex items-center justify-center p-2 min-h-[80px]'>
                {`${idx + 1}`.padStart(3, '0')}
              </td>
              <td className='p-2 border-r md:border-x border-primary/10 dark:border-secondary/20'>
                <div className='flex space-x-2'>
                  <Avatar size='md' name={user.name} />
                  <div className='flex flex-col justify-center'>
                    <b className='font-mono'>{user.name}</b>
                    <span className='text-sm'>{user.email}</span>
                  </div>
                </div>
              </td>
              <td className='p-2 border-x border-primary/10 dark:border-secondary/20'>
                <div className='flex flex-wrap gap-2'>
                  {user.roles?.map(role => (
                    <RoleTags key={role} role={role} />
                  ))}
                </div>
              </td>
              <td className='w-32 p-2 border-x border-primary/10 dark:border-secondary/20'>
                <div className='font-mono text-sm'>{user.createdAt}</div>
              </td>
              <td className='w-24'>
                <div className='flex items-center justify-evenly'>
                  <button
                    disabled={user._id === presentUser?._id}
                    className='flex p-1 place-items-center disabled:opacity-50'
                    onClick={() => {
                      setCurrentUser(user.clerkID)
                      openUpdateRoleModal()
                    }}
                  >
                    <i className='material-icons-sharp'>manage_accounts</i>
                  </button>
                  <button
                    disabled={user._id === presentUser?._id}
                    className='flex p-1 place-items-center disabled:opacity-50'
                    onClick={() => {
                      setCurrentUser(user.clerkID)
                      openDeleteUsersModal()
                    }}
                  >
                    <i className='material-icons-sharp text-danger'>
                      delete_forever
                    </i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateRoleModal
        user={currentUser}
        name={
          users.find(({ clerkID }) => currentUser === clerkID)
            ?.firstName as string
        }
        loading={loading}
        handleSubmit={updateUser}
        isOpen={updateRoleModal}
        closeModal={closeUpdateRoleModal}
      />
      <DeleteUserModal
        user={currentUser}
        loading={loading}
        handleSubmit={deleteUser}
        isOpen={userDeleteModal}
        closeModal={closeDeleteUsersModal}
      />
    </>
  ) : null
}

export default memo(UsersTable)
