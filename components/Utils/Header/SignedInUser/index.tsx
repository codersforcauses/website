import { useMemo, useCallback, Dispatch, SetStateAction } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Auth } from 'aws-amplify'
import Router from 'next/router'
import { getInitials, UserProps } from '@helpers/user'

const UserMenu = ({ name, setUser, ...props }: Props) => {
  const initials = useMemo(() => getInitials(name), [name])

  const handleSignOut = useCallback(async () => {
    await Auth.signOut()
    setUser(undefined)
    Router.push('/')
  }, [setUser])

  return (
    <Menu as='div' className='relative text-secondary'>
      {({ open }) => (
        <>
          <Menu.Button className='py-1.5 my-px border border-secondary hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary'>
            <span className='items-center hidden pl-4 mr-3 md:flex'>
              {name}
              <span className='material-icons-sharp'>
                {open ? 'expand_less' : 'expand_more'}
              </span>
            </span>
            <span className='px-2 md:hidden'>{initials}</span>
          </Menu.Button>
          <Transition
            show={open}
            enter='transition ease-out duration-150'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              static
              className='absolute right-0 flex flex-col items-stretch w-full py-2 mt-2 space-y-1 border border-secondary bg-primary'
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`flex items-center py-2 px-4 text-sm ${
                      active && 'bg-secondary text-primary'
                    }`}
                    href='/dashboard'
                  >
                    <span className='mr-2 material-icons-sharp'>dashboard</span>
                    Dashboard
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`flex items-center py-2 px-4 text-sm ${
                      active && 'bg-secondary text-primary'
                    }`}
                    href={`/profile/${props.id}`}
                  >
                    <span className='mr-2 material-icons-sharp'>person</span>
                    My profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex items-center py-2 px-4 text-sm ${
                      active && 'bg-secondary text-primary'
                    }`}
                    onClick={handleSignOut}
                  >
                    <span className='mr-2 material-icons-sharp'>
                      exit_to_app
                    </span>
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default UserMenu

interface Props {
  id: string
  name: string
  image?: string
  setUser: Dispatch<SetStateAction<UserProps | undefined | null>>
}
