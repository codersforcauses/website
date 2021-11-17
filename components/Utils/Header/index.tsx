import { Transition, Menu } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '@helpers/user'
import SignedInUser from './SignedInUser'
import DarkToggle from './DarkToggle'

const links: Array<HeaderItem> = [
  { href: '/about', text: 'About' },
  { href: '/projects', text: 'Projects' },
  { href: '/events', text: 'Events' },
  {
    href: 'https://guides.codersforcauses.org/',
    text: 'Guides',
    isExternal: true
  }
]

const Header = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <Menu as='header' className='fixed inset-x-0 top-0 z-30 py-3 bg-primary'>
      {({ open }) => (
        <div className='container px-3 mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center text-secondary md:items-end'>
              <Menu.Button className='p-1 mr-3 material-icons-sharp text-secondary md:hidden hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'>
                {open ? 'close' : 'menu'}
              </Menu.Button>
              <Link href='/'>
                <a
                  id='Home'
                  className='px-1 py-2 -my-2 -mr-3 font-mono text-xl font-black no-underline select-none text-secondary hover:bg-secondary hover:text-primary md:mr-12 focus:outline-none focus:bg-secondary focus:text-primary'
                  data-cy='nav-Home'
                >
                  cfc
                </a>
              </Link>
              <nav className='hidden space-x-3 md:flex'>
                {links.map(({ isExternal, text, href }: HeaderItem)  => (
                  <Fragment key={text}>
                    {isExternal ? (
                      <a
                        href={href}
                        target='_blank'
                        rel='noreferrer noopener'
                        className='align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                        data-cy={`nav-${text}`}
                      >
                        {text}
                      </a>
                    ) : (
                    <Link href={href} passHref>
                      <a
                        className='align-text-bottom text-secondary hover:underline focus:outline-none focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-4 focus:ring-offset-primary'
                        data-cy={`nav-${text}`}
                      >
                        {text}
                      </a>
                    </Link>
                    )}
                  </Fragment>
                ))}
              </nav>
            </div>
            <div className='flex items-end space-x-3'>
              <DarkToggle />
              {
                // user ? (
                //   <SignedInUser setUser={setUser} name={user.name} id={user._id} />
                // ) : null
                <Link href='/membership'>
                  <a className='px-4 py-1.5 my-px bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-primary focus:outline-none focus:ring-opacity-0 focus:bg-secondary focus:text-primary'>
                    Membership
                  </a>
                </Link>
              }
            </div>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Menu.Items
              static
              as='nav'
              className='flex flex-col mt-3 space-y-3 ml-11 md:hidden max-w-min'
            >
              {links.map(({ isExternal, text, href }: HeaderItem) => (
                <Menu.Item key={text}>
                  {({ active }) => isExternal ? (
                    <a
                      href={href}
                      target='_blank'
                      rel='noreferrer noopener'
                      className={`align-text-bottom text-secondary ${active && 'underline'}`}
                      data-cy={`nav-${text}`}
                    >
                      {text}
                    </a>
                  ) : (
                    <Link href={href} passHref>
                      <a
                        className={`align-text-bottom text-secondary ${active && 'underline'}`}
                        data-cy={`nav-${text}`}
                      >
                        {text}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}

export default Header

interface HeaderItem {
  href: string
  text: string
  isExternal?: boolean
}