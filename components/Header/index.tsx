import React, { Component } from 'react'
import { Navbar, NavbarBrand, Container, Nav, Button } from 'reactstrap'
import Link from 'next/link'
import HeaderItem, { HeaderItemContent } from './HeaderItem'

export default class Header extends Component {
  links: HeaderItemContent[] = [
    {
      href: '/about',
      text: 'About',
      items: [
        { text: 'Team', href: '/about' },
        { text: 'Sponsors', href: '/about' },
        { text: 'Contact', href: '/about' }
      ]
    },
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
                <HeaderItem item={link} key={link.text} />
              ))}
            </Nav>
          </Nav>
          <Button color='secondary' outline>
            Membership
          </Button>
        </Container>
      </Navbar>
    )
  }
}
