import React from 'react'
import { NavItem, NavItemProps } from 'reactstrap'
import HeaderDropdown from './HeaderDropdown'
import HeaderLink from './HeaderLink'

export default function (props: Props) {
  const { item, ...rest } = props
  const { href, text, items } = item
  return (
    <NavItem {...rest}>
      {items ? (
        <HeaderDropdown items={items} href={href} text={text} />
      ) : (
        <HeaderLink href={href} text={text} />
      )}
    </NavItem>
  )
}

interface Props extends NavItemProps {
  item: HeaderItemContent
}

export interface HeaderItemContent {
  href: string
  text: string
  items?: HeaderItemContent[]
}
