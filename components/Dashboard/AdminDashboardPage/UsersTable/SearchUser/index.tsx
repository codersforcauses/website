import { ChangeEvent, Fragment, memo, useCallback, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { Types } from 'mongoose'
import { User } from '@lib/types'

const defaultValue: FilteredUser = {
  id: '',
  name: '',
  email: ''
}

const SearchUser = () => {
  const [users, setUsers] = useState<Array<FilteredUser>>([])
  const [selectedUser, setSelectedUser] = useState<FilteredUser>(defaultValue)

  const getValue = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (value === '') setSelectedUser(defaultValue)
      else {
        fetch(`/api/users?all=true&findUser=${value}`)
          .then(resp => resp.json())
          .then((userList: Array<User>) => {
            const filteredUsers: Array<FilteredUser> = userList?.map(user => ({
              id: user?._id,
              name: user?.name,
              email: user?.email
            }))
            setUsers(filteredUsers)
          })
      }
    },
    []
  )

  return (
    <div className='relative z-20 w-64'>
      <Combobox value={selectedUser} onChange={setSelectedUser}>
        {({ open }) => (
          <>
            <Combobox.Input
              type='search'
              placeholder='Search'
              className='w-full pr-10 mt-px bg-transparent border h-11 focus:outline-none focus:ring-0 focus:border-current border-primary text-primary dark:border-secondary dark:text-secondary'
              onChange={getValue}
              displayValue={(user: FilteredUser) => user.name!}
            />
            <span
              aria-hidden='true'
              className='absolute right-2 inset-y-2.5 material-icons-sharp'
            >
              search
            </span>
            <Transition
              as={Fragment}
              show={open}
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Combobox.Options
                static
                className='absolute w-full border border-t-0 bg-secondary dark:bg-alt-dark'
              >
                {users.map(user => (
                  <Combobox.Option
                    key={user.id as string}
                    value={user}
                    className={({ active }) =>
                      [
                        active
                          ? 'bg-primary text-secondary dark:bg-secondary dark:text-primary cursor-pointer'
                          : '',
                        'px-3 py-2 flex flex-col'
                      ]
                        .join(' ')
                        .trim()
                    }
                  >
                    <>
                      {user.name}
                      <small className='opacity-60'>{user.email}</small>
                    </>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </div>
  )
}

interface FilteredUser {
  id?: string | Types.ObjectId
  name?: string
  email?: string
}

export default memo(SearchUser)
