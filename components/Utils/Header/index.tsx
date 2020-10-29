import { useTheme } from 'emotion-theming'
import { useContext, useState, useCallback } from 'react'
import {
  Navbar,
  NavbarBrand,
  Container,
  Nav,
  Button,
  Collapse,
  NavbarToggler
} from 'reactstrap'
import Link from 'next/link'
import { UserContext } from 'helpers/user'
import SignedInUser from './SignedInUser'
import HeaderItem, { HeaderItemContent } from './HeaderItem'
import DarkToggle from './DarkToggle'
import { styles } from './styles'

const Header = (props: { handleDarkToggle: Function }) => {
  const [open, setOpen] = useState(false)

  const { user, setUser } = useContext(UserContext)

  const theme = useTheme()

  const links: HeaderItemContent[] = [
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/events', text: 'Events' },
    {
      href: 'https://guides.codersforcauses.org/',
      text: 'Guides',
      isExternal: true
    }
  ]

  const toggleOpen = useCallback(() => setOpen(open => !open), [])

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
            className='mr-3 d-flex d-md-none align-items-center px-0 ml-sm-3 border-0'
          >
            <i className='material-icons-sharp text-secondary'>
              {open ? 'close' : 'menu'}
            </i>
          </NavbarToggler>
          <Link href='/' passHref>
            <NavbarBrand
              id='Home'
              className='mr-md-5 py-0 user-select-none font-weight-bold text-monospace brand'
              data-cy='nav-Home'
            >
              cfc
            </NavbarBrand>
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
              <SignedInUser
                setUser={setUser}
                name={`${user?.given_name} ${user?.family_name}`}
              />
            ) : null
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
      </Container>
    </Navbar>
  )
}

export default Header
