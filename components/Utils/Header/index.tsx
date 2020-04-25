/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useContext, useState } from 'react'
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
import SignedInUser from './SignedInUser'
import HeaderItem, { HeaderItemContent } from './HeaderItem'
import { styles } from './styles'
import { UserContext } from 'helpers/user'

const Header = (props: { theme: Object }) => {
  const [open, setOpen] = useState(false)

  const links: HeaderItemContent[] = [
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/events', text: 'Events' }
  ]

  const toggleOpen = () => setOpen(!open)

  const { user, setUser } = useContext(UserContext)

  return (
    <Navbar
      dark
      tag='header'
      color='primary'
      expand='md'
      className='text-secondary py-3 fixed-top shadow-sm'
      css={styles(props.theme)}
    >
      <Container>
        <Nav className='justify-content-start' tag='div'>
          <NavbarToggler
            id='Menu'
            onClick={toggleOpen}
            className='mr-5 d-flex d-md-none align-items-center px-0 ml-sm-3 border-0'
          >
            <i className='material-icons-sharp text-secondary'>menu</i>
          </NavbarToggler>
          <NavbarBrand
            href='/'
            id='Home'
            title='Home'
            className='mr-md-5 brand font-weight-bold monospace'
          >
            cfc
          </NavbarBrand>
          <Collapse navbar isOpen={open} className='pl-3 pl-md-0'>
            <Nav navbar>
              {links.map(link => (
                <HeaderItem item={link} key={link.text} />
              ))}
            </Nav>
          </Collapse>
        </Nav>
        {user ? (
          <SignedInUser
            setUser={setUser}
            name={`${user?.given_name} ${user?.family_name}`}
          />
        ) : (
          <Link href='/membership'>
            <Button
              outline
              color='secondary'
              className='d-none d-md-block rounded-0'
            >
              Membership
            </Button>
          </Link>
        )}
      </Container>
    </Navbar>
  )
}

export default withTheme(Header)
