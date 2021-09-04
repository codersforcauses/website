/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext, useState, useCallback } from 'react'
import {
  Navbar,
  Container,
  Nav,
  Button,
  Collapse,
  NavbarToggler
} from 'reactstrap'
import Link from 'next/link'
import Router from 'next/router'
import { UserContext } from 'helpers/user'
import SignedInUser from './SignedInUser'
import HeaderItem, { HeaderItemContent } from './HeaderItem'
import DarkToggle from './DarkToggle'
import { styles } from './styles'

const links: HeaderItemContent[] = [
  { href: '/about', text: 'About' },
  { href: '/projects', text: 'Projects' },
  { href: '/events', text: 'Events' },
  {
    href: 'https://guides.codersforcauses.org/',
    text: 'Guides',
    isExternal: true
  },
  {
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScPEsHxs1afKNF7Zo9i7JkDgGlg3k-nZowJspsb18ve1odkaA/viewform',
    text: 'Join',
    isExternal: true
  }
]

const Header = (props: { handleDarkToggle: () => void }) => {
  const [open, setOpen] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const theme = useTheme()

  const toggleOpen = useCallback(() => setOpen(open => !open), [])

  Router.events.on('routeChangeStart', () => {
    setOpen(false)
  })

  return (
    <Navbar
      dark
      tag='header'
      color='primary'
      expand='md'
      className={`text-secondary py-3 fixed-top shadow-sm ${
        open && 'border-bottom border-secondary'
      }`}
      css={styles(theme)}
    >
      <Container>
        <Nav tag='div'>
          <NavbarToggler
            id='Menu'
            onClick={toggleOpen}
            className='mr-3 d-flex d-md-none align-items-center px-0 ml-sm-3 border-0 rounded-0'
          >
            <i className='material-icons-sharp text-secondary'>
              {open ? 'close' : 'menu'}
            </i>
          </NavbarToggler>
          <Link href='/' passHref>
            <a
              id='Home'
              className='mr-md-5 py-0 user-select-none font-weight-bold text-monospace brand navbar-brand'
              data-cy='nav-Home'
            >
              cfc
            </a>
          </Link>
          <Collapse navbar isOpen={open} className='pl-4 ml-2 pl-md-0'>
            <Nav navbar>
              {links.map(link => (
                <HeaderItem item={link} key={link.text} />
              ))}
            </Nav>
          </Collapse>
        </Nav>
        <div>
          <DarkToggle {...props} />
          {
            user ? (
              <SignedInUser setUser={setUser} name={user.name} id={user._id} />
            ) : null
            //  <Link href='/membership'>
            //    <Button
            //      outline
            //      size='sm'
            //      color='secondary'
            //      className='d-none d-md-block rounded-0'
            //    >
            //      Membership
            //    </Button>
            //  </Link>
          }
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
