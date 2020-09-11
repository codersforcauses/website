import React from 'react'
import { NavItemProps, NavItem } from 'reactstrap'
import HeaderDropdown from './HeaderDropdown'
import HeaderLink from './HeaderLink'

const HeaderItem = ({
  item: { href, text, isExternal = false, items },
  ...props
}: Props) => (
  <NavItem {...props}>
    {items ? (
      <HeaderDropdown items={items} href={href} text={text} />
    ) : (
      <HeaderLink href={href} text={text} isExternal={isExternal} />
    )}
  </NavItem>
)

interface Props extends NavItemProps {
  item: HeaderItemContent
}

export interface HeaderItemContent {
  href: string
  text: string
  isExternal?: boolean
  items?: HeaderItemContent[]
}

export default HeaderItem
