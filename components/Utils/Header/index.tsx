import { Transition } from '@headlessui/react'
import { useContext, useState, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { UserContext } from 'helpers/user'
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
  const [open, setOpen] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const toggleOpen = useCallback(() => setOpen(open => !open), [])

  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-30 py-3 bg-primary',
        open ? 'border-b-2 border-secondary' : undefined
      ]
        .join(' ')
        .trim()}
    >
      <div className='container flex items-center justify-between px-3 mx-auto'>
        <div className='flex items-center md:items-end'>
          <button
            className='grid p-1 mr-3 text-secondary place-center md:hidden hover:opacity-75 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent focus:ring-opacity-50 focus:ring-offset-primary'
            onClick={toggleOpen}
          >
            <span className='material-icons-sharp'>
              {open ? 'close' : 'menu'}
            </span>
          </button>
          <Link href='/' passHref>
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
        as='nav'
        show={open}
        enter='transition-all ease-out duration-300'
        enterFrom='opacity-0 h-0'
        enterTo='opacity-100 h-full'
        leave='transition-all ease-in duration-150'
        leaveFrom='opacity-100 h-full'
        leaveTo='opacity-0 h-0'
        className='container flex flex-col px-3 mt-3 space-y-3 overflow-y-hidden ml-11 md:hidden'
      >
        {links.map(link => (
          <HeaderLink key={link.text} {...link} />
        ))}
      </Transition>
    </header>
  )
}

export default Header
