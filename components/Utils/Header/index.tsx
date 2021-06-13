import { Transition, Popover } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '@helpers/user'
import SignedInUser from './SignedInUser'
import HeaderLink, { HeaderItem } from './HeaderLink'
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
    <Popover as='header' className='fixed inset-x-0 top-0 z-30 py-3 bg-primary'>
      {({ open }) => (
        <div className='container px-3 mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center text-secondary md:items-end'>
              <Popover.Button className='p-1 mr-3 material-icons-sharp text-secondary md:hidden hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'>
                {open ? 'close' : 'menu'}
              </Popover.Button>
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
                {links.map(link => (
                  <HeaderLink key={link.text} {...link} />
                ))}
              </nav>
            </div>
            <div className='flex items-end space-x-3'>
              <DarkToggle />
              {
                // user ? (
                //   <SignedInUser setUser={setUser} name={user.name} id={user._id} />
                // ) : null
                // <Link href='/membership'>
                //   <Button
                //     outline
                //     size='sm'
                //     color='secondary'
                //     className='d-none d-md-block rounded-0'
                //   >
                //     Membership
                //   </Button>
                // </Link>
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
            <Popover.Panel
              as='nav'
              className='flex flex-col mt-3 space-y-3 ml-11 md:hidden max-w-min'
            >
              {links.map(link => (
                <HeaderLink key={link.text} {...link} />
              ))}
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  )
}

export default Header
