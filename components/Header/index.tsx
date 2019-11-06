import React, { useState } from 'react'
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

const links: HeaderItemContent[] = [
  { href: '/about', text: 'About' },
  { href: '/events', text: 'Events' },
  { href: '/projects', text: 'Projects' }
]

export default () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Navbar
      dark
      color='dark'
      className='text-white py-3 fixed-top shadow-sm'
      expand='md'
    >
      <Container>
        <Nav className='justify-content-start'>
          <NavbarToggler
            className='mr-4 d-block d-md-none d-flex align-items-center pl-0 border-0'
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className='fas fa-bars text-white' />
          </NavbarToggler>
          <Link href='/'>
            <NavbarBrand className='mr-md-5'>
              <code className='font-weight-bold' style={{ cursor: 'pointer' }}>
                cfc
              </code>
            </NavbarBrand>
          </Link>
          <Collapse navbar isOpen={isOpen}>
            <Nav navbar>
              {links.map(link => (
                <HeaderItem item={link} key={link.text} />
              ))}
            </Nav>
          </Collapse>
        </Nav>
        <Button outline color='secondary' className='d-none d-md-block'>
          Membership
        </Button>
      </Container>
    </Navbar>
  )
}
