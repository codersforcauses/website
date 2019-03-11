import React, { Component } from 'react'
import {
  Navbar,
  NavbarBrand,
  Container,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap'
import Link from 'next/link'

export default class Header extends Component {
  links = [
    { href: '/about', text: 'About' },
    { href: '/events', text: 'Events' },
    { href: '/projects', text: 'Projects' }
  ]

  render () {
    return (
      <Navbar color='dark' className='text-white py-3 fixed-top shadow-sm' dark>
        <Container>
          <Nav className='justify-content-start'>
            <Link href='/'>
              <NavbarBrand className='mr-5 pr-5'>
                <code className='font-weight-bold'>cfc</code>
              </NavbarBrand>
            </Link>
            <Nav>
              {this.links.map(link => (
                <NavItem key={link.href}>
                  <Link href={link.href}>
                    <NavLink>{link.text}</NavLink>
                  </Link>
                </NavItem>
              ))}
            </Nav>
          </Nav>
          <Button color='secondary' outline className=''>
            Membership
          </Button>
        </Container>
      </Navbar>
    )
  }
}
