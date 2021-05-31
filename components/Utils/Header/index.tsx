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

const Header = (props: { handleDarkToggle: () => void }) => {
  const [open, setOpen] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const toggleOpen = useCallback(() => setOpen(open => !open), [])

  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 py-4 bg-primary ${
        open && 'border-bottom border-secondary'
      }`}
    >
      <div className='container flex items-center justify-between px-3 mx-auto'>
        <div className='flex items-center md:items-end'>
          <button className='grid p-1 mr-3 text-secondary place-center md:hidden'>
            <span className='material-icons-sharp'>
              {open ? 'close' : 'menu'}
            </span>
          </button>
          <Link href='/' passHref>
            <a
              id='Home'
              className='font-mono text-xl font-black no-underline select-none text-secondary md:mr-4'
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
          <Transition
            as='nav'
            show={open}
            enter='transition-opacity duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {links.map(link => (
              <HeaderLink key={link.text} {...link} />
            ))}
          </Transition>
        </div>
        <div className='flex items-end'>
          <DarkToggle />
          {
            user ? (
              <SignedInUser setUser={setUser} name={user.name} id={user._id} />
            ) : null
            //         // <Link href='/membership'>
            //         //   <Button
            //         //     outline
            //         //     size='sm'
            //         //     color='secondary'
            //         //     className='d-none d-md-block rounded-0'
            //         //   >
            //         //     Membership
            //         //   </Button>
            //         // </Link>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
