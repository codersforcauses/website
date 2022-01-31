import { memo, useCallback, useState } from 'react'
import useSWR from 'swr'
import Avatar from '@elements/Avatar'
import { User } from '@helpers/global'
import RoleTags from '../RoleTags'
import DeleteUserModal from '../UsersTable/DeleteUserModal'
import UpdateRoleModal from '../UsersTable/UpdateRoleModal'

const UsersTable = () => {
  const { data: users } = useSWR<Array<NonNullable<User>>>('/api/users')
  const [currentUser, setCurrentUser] = useState('')
  const [userDeleteModal, setUserDeleteModal] = useState(false)
  const [updateRoleModal, setUpdateRoleModal] = useState(false)

  const openDeleteUsersModal = useCallback(() => setUserDeleteModal(true), [])
  const closeDeleteUsersModal = useCallback(() => {
    setUserDeleteModal(false)
    setCurrentUser('')
  }, [])
  const openUpdateRoleModal = useCallback(() => setUpdateRoleModal(true), [])
  const closeUpdateRoleModal = useCallback(() => {
    setUpdateRoleModal(false)
    setCurrentUser('')
  }, [])

  return users ? (
    <>
      {/* <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-x-4 lg:gap-x-16'>
        <div className='px-4 py-2 bg-alt-light dark:bg-primary'>
          <span className='text-xs'>Total Members</span>
          <p className='font-mono text-4xl'>{users.length}</p>
        </div>
        <div className='px-4 py-2 bg-alt-light dark:bg-primary'>
          <span className='text-xs'>Total Paying Members</span>
          <p className='font-mono text-4xl'>{users.length}</p>
        </div>
        <div className='px-4 py-2 bg-alt-light dark:bg-primary'>
          <span className='text-xs'>Total Paying Members</span>
          <p className='font-mono text-4xl'>{users.length}</p>
        </div>
      </div> */}
      <table className='w-full overflow-x-scroll border-collapse'>
        <thead className='font-mono font-black text-left'>
          <tr>
            <th className='p-2' />
            <th className='p-2'>Member</th>
            <th className='p-2'>Roles</th>
            <th className='p-2'>Joined On</th>
            <th className='p-2 text-center'>Manage</th>
          </tr>
        </thead>
        <tbody className='text-lg'>
          {users?.map((user, idx) => (
            <tr key={idx} className='dark:odd:bg-primary odd:bg-alt-light'>
              <td className='p-2 text-center'>
                {`${idx + 1}`.padStart(3, '0')}
              </td>
              <td className='p-2 border-x border-primary/10 dark:border-secondary/20'>
                <div className='flex space-x-2'>
                  <Avatar size='md' name={user.name} />
                  <div className='flex flex-col justify-center'>
                    <b className='font-mono'>{user.name}</b>
                    <span className='text-sm'>{user.email}</span>
                    <span className='text-sm'>{user._id}</span>
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
                    className='flex p-1 place-items-center'
                    onClick={() => {
                      setCurrentUser(user._id)
                      openUpdateRoleModal()
                    }}
                  >
                    <i className='material-icons-sharp'>manage_accounts</i>
                  </button>
                  <button
                    className='flex p-1 place-items-center'
                    onClick={() => {
                      setCurrentUser(user._id)
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
        name={users.find(({ _id }) => currentUser === _id)?.firstName as string}
        isOpen={updateRoleModal}
        closeModal={closeUpdateRoleModal}
      />
      <DeleteUserModal
        user={currentUser}
        isOpen={userDeleteModal}
        closeModal={closeDeleteUsersModal}
      />
    </>
  ) : null
}

export default memo(UsersTable)
