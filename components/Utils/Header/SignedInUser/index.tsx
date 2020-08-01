/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState } from 'react'
import { Auth } from '@aws-amplify/auth'
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Router from 'next/router'
import { getInitials } from 'helpers/user'
import { styles } from './styles'

const UserMenu = ({ name, setUser, ...props }: Props) => {
  const [dropdown, setDropdown] = useState(false)

  const theme = useTheme()

  const initials = getInitials(name)

  const handleSignOut = async () => {
    await Auth.signOut()
    setUser(undefined)
    Router.push('/')
  }

  return (
    <ButtonDropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
      <DropdownToggle
        color='primary'
        className='d-flex align-items-center rounded-0 p-0'
      >
        <p className='m-0 d-none d-md-block'>{name && name}</p>
        <div
          className='d-flex align-items-center justify-content-center ml-2 monospace rounded-circle'
          css={styles(theme, props.image)}
        >
          {name && <p className='m-0'>{initials}</p>}
        </div>
      </DropdownToggle>
      <DropdownMenu className='rounded-0 mt-2'>
        <DropdownItem
          href='/dashboard'
          className='d-flex align-items-center px-3 py-2'
        >
          <i className='material-icons-sharp mr-2'>dashboard</i>
          <small>Dashboard</small>
        </DropdownItem>
        <DropdownItem
          href='/account_settings'
          className='d-flex align-items-center px-3 py-2'
        >
          <i className='material-icons-sharp mr-2'>settings</i>
          <small>Account Settings</small>
        </DropdownItem>
        <DropdownItem
          className='d-flex align-items-center px-3 py-2'
          onClick={handleSignOut}
        >
          <i className='material-icons-sharp mr-2'>exit_to_app</i>
          <small>Sign Out</small>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  )
}

export default UserMenu

interface Props {
  name?: string
  image?: string
  setUser: Function
}
