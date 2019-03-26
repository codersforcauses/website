import React, { Component } from 'react'
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

export default class Header extends Component<{}, State> {
  state = {
    isOpen: false
  }

  links: HeaderItemContent[] = [
    { href: '/about', text: 'About' },
    { href: '/events', text: 'Events' },
    { href: '/projects', text: 'Projects' }
  ]

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  render () {
    const { isOpen } = this.state
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
              onClick={this.toggleOpen}
            >
              <i className='fas fa-bars text-white' />
            </NavbarToggler>
            <Link href='/'>
              <NavbarBrand className='mr-md-5 pr-md-5'>
                <code className='font-weight-bold' style={{ cursor: 'pointer' }}>cfc</code>
              </NavbarBrand>
            </Link>
            <Collapse navbar isOpen={isOpen}>
              <Nav navbar>
                {this.links.map(link => (
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
}

interface State {
  isOpen: boolean
}
