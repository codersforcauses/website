import React, { useState } from 'react'
import { DropdownMenu, DropdownItem, Dropdown } from 'reactstrap'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import HeaderLink from '../HeaderLink'
import Link from 'next/link'

export default function (props: Props) {
  const { items, href, text } = props
  const [isOpen, updateIsOpen] = useState(false)
  return (
    <Dropdown
      {...props}
      onMouseOver={() => updateIsOpen(true)}
      onFocus={() => updateIsOpen(true)}
      onMouseLeave={() => updateIsOpen(false)}
      onBlur={() => updateIsOpen(false)}
      toggle={() => updateIsOpen(!isOpen)}
      isOpen={isOpen}
    >
      {style}
      <DropdownToggle nav className='header-dropdown-toggle'>
        <Link href={href}>
          <span>{text}</span>
        </Link>
      </DropdownToggle>
      <DropdownMenu className='header-dropdown-menu'>
        {items.map(item => (
          <DropdownItem key={item.href}>
            <HeaderLink href={item.href} text={item.text} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

const style = (
  <style jsx>{`
    .header-dropdown-menu {
      border: 0;
    }
    a.header-dropdown-toggle {
      color: #ffffff;
    }
  `}</style>
)

interface Props {
  items: Array<{
    href: string
    text: string
  }>
  text: string
  href: string
}
