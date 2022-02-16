import { useMemo, useCallback, Fragment } from 'react'
import { useClerk } from '@clerk/nextjs'
import { Menu, Transition } from '@headlessui/react'
import Router from 'next/router'
import Link from 'next/link'
import { getInitials, useUser } from '@helpers/user'

const UserMenu = () => {
  const { user } = useUser()
  const { signOutOne } = useClerk()

  const isAdmin = true
  // user?.roles && user.roles.length > 0 && !user.roles.includes('member')

  const Links = useMemo(
    () => [
      {
        text: 'Dashboard',
        icon: 'dashboard',
        href: '/dashboard'
      },
      {
        text: 'My profile',
        icon: 'person',
        href: `/profile/${user?._id}`
      }
    ],
    [user?._id]
  )

  const initials = useMemo(
    () => getInitials(user?.name as string),
    [user?.name]
  )

  const handleSignOut = useCallback(() => {
    signOutOne()
    Router.push('/')
  }, [signOutOne])

  return (
    <Menu as='div' className='relative text-secondary'>
      {({ open }) => (
        <>
          <Menu.Button className='py-1.5 px-4 my-px border border-secondary hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none'>
            <span className='items-center justify-between hidden md:flex'>
              {user?.name}
              <span className='-mr-1 material-icons-sharp'>
                {open ? 'expand_less' : 'expand_more'}
              </span>
            </span>
            <span className='md:hidden'>{initials}</span>
          </Menu.Button>
          <Transition
            as={Fragment}
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
              className='min-w-[9rem] w-full absolute right-0 flex flex-col items-stretch py-2 mt-2 space-y-1 border border-secondary bg-primary focus:outline-none'
            >
              {Links.map(link => (
                <Menu.Item key={link.icon}>
                  {({ active }) => (
                    <Link href={link.href} passHref>
                      <a
                        className={`flex items-center py-2 px-4 text-sm hover:bg-secondary hover:text-primary ${
                          active && 'bg-secondary text-primary'
                        }`}
                      >
                        <span className='mr-2 material-icons-sharp'>
                          {link.icon}
                        </span>
                        {link.text}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))}
              {isAdmin && (
                <Menu.Item>
                  {({ active }) => (
                    <Link href='/dashboard/admin' passHref>
                      <a
                        className={`flex items-center py-2 px-4 text-sm hover:bg-secondary hover:text-primary ${
                          active && 'bg-secondary text-primary'
                        }`}
                      >
                        <span className='mr-2 material-icons-sharp'>
                          admin_panel_settings
                        </span>
                        Admin Dash
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              )}
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
