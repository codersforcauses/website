/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import React, { useState } from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownItem, Dropdown } from 'reactstrap'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import HeaderLink from '../HeaderLink'
import { style } from './style'

const HeaderDropdown = ({ items, href, text, ...props }: Props) => {
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
      css={style(props.theme)}
    >
      <DropdownToggle nav className='header-dropdown-toggle'>
        <Link href={href}>
          <span>{text}</span>
        </Link>
      </DropdownToggle>
      <DropdownMenu className='header-dropdown-menu'>
        {items.map((item) => (
          <DropdownItem key={item.href}>
            <HeaderLink href={item.href} text={item.text} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

interface Props {
  items: Array<{
    href: string
    text: string
  }>
  text: string
  href: string
  theme: Object
}

export default withTheme(HeaderDropdown)
