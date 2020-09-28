/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownItem, Dropdown } from 'reactstrap'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import HeaderLink from '../HeaderLink'
import { styles } from './styles'

const HeaderDropdown = ({ items, href, text, ...props }: Props) => {
  const [isOpen, updateIsOpen] = useState(false)
  const theme = useTheme()

  const toggleUpdateOn = useCallback(() => updateIsOpen(true), [])
  const toggleUpdateOff = useCallback(() => updateIsOpen(false), [])
  const toggleUpdate = useCallback(() => updateIsOpen(isOpen => !isOpen), [])
  return (
    <Dropdown
      {...props}
      onMouseOver={toggleUpdateOn}
      onFocus={toggleUpdateOn}
      onMouseLeave={toggleUpdateOff}
      onBlur={toggleUpdateOff}
      toggle={toggleUpdate}
      isOpen={isOpen}
      css={styles(theme)}
    >
      <DropdownToggle nav className='header-dropdown-toggle'>
        <Link href={href}>
          <span>{text}</span>
        </Link>
      </DropdownToggle>
      <DropdownMenu className='header-dropdown-menu'>
        {items.map(item => (
          <DropdownItem key={item.href}>
            <HeaderLink
              href={item.href}
              text={item.text}
              isExternal={item.isExternal}
            />
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
    isExternal?: boolean
  }>
  text: string
  href: string
}

export default HeaderDropdown
