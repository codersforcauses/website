import { useMemo, useCallback, useContext, useEffect, Fragment } from 'react'
import { useClerk } from '@clerk/nextjs'
import { Menu, Transition } from '@headlessui/react'
import useSWR from 'swr'
import Router from 'next/router'
import { User } from '@helpers/global'
import { getInitials, UserContext } from '@helpers/user'
import Link from 'next/link'

const UserMenu = () => {
  const { setUser } = useContext(UserContext)
  const { user: clerkUser, signOut } = useClerk()
  const { data: user } = useSWR<User>(
    clerkUser ? `/api/users?clerkID=${clerkUser.id}` : null
  )

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

  useEffect(() => {
    user && setUser(user)
  }, [setUser, user])

  const initials = useMemo(
    () => getInitials(clerkUser?.fullName as string),
    [clerkUser?.fullName]
  )

  const handleSignOut = useCallback(() => {
    signOut()
    setUser(null)
    Router.push('/')
  }, [setUser, signOut])

  return (
    <Menu as='div' className='relative text-secondary'>
      {({ open }) => (
        <>
          <Menu.Button className='py-1.5 px-4 my-px border border-secondary hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none'>
            <span className='items-center justify-between hidden md:flex'>
              {clerkUser?.fullName}
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
              className='min-w-[8.5rem] w-full absolute right-0 flex flex-col items-stretch py-2 mt-2 space-y-1 border border-secondary bg-primary focus:outline-none'
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
