/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
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
import HeaderItem, { HeaderItemContent } from './HeaderItem'
import { styles } from './style'

const Header = (props: { theme: Object }) => {
  const [open, setOpen] = useState(false)

  const links: HeaderItemContent[] = [
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/events', text: 'Events' }
  ]

  const toggleOpen = () => setOpen(!open)

  return (
    <Navbar
      dark
      color='dark'
      className='text-white py-3 fixed-top shadow-sm'
      expand='md'
      css={styles(props.theme)}
    >
      <Container>
        <Nav className='justify-content-start' tag='div'>
          <NavbarToggler
            className='mr-5 d-flex d-md-none align-items-center px-0 ml-sm-3 border-0'
            onClick={toggleOpen}
          >
            <i className='material-icons-sharp text-white'>menu</i>
          </NavbarToggler>
          <NavbarBrand
            href='/'
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
        <Button
          outline
          color='secondary'
          className='d-none d-md-block rounded-0'
        >
          Membership
        </Button>
      </Container>
    </Navbar>
  )
}

export default withTheme(Header)
