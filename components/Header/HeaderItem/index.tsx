import React from 'react'
import { NavItem, NavItemProps } from 'reactstrap'
import HeaderDropdown from './HeaderDropdown'
import HeaderLink from './HeaderLink'

export default ({ item: { href, text, items }, ...rest }: Props) => (
  <NavItem {...rest}>
    {items ? (
      <HeaderDropdown items={items} href={href} text={text} />
    ) : (
      <HeaderLink href={href} text={text} />
    )}
  </NavItem>
)

interface Props extends NavItemProps {
  item: HeaderItemContent
}

export interface HeaderItemContent {
  href: string
  text: string
  items?: HeaderItemContent[]
}
