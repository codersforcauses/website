/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useMemo, useCallback } from 'react'
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

  const toggleDropdown = useCallback(() => setDropdown(prev => !prev), [])
  const initials = useMemo(() => getInitials(name), [name])

  const handleSignOut = useCallback(async () => {
    await Auth.signOut()
    setUser(undefined)
    Router.push('/')
  }, [])

  return (
    <ButtonDropdown isOpen={dropdown} toggle={toggleDropdown}>
      <DropdownToggle
        color='primary'
        className='d-flex align-items-center rounded-0 p-0 ml-2'
      >
        {name && (
          <>
            <p className='m-0 d-none d-md-block'>{name}</p>
            <div
              className='d-flex align-items-center justify-content-center ml-2 text-monospace rounded-circle'
              css={styles(theme, props.image)}
            >
              <p className='m-0'>{initials}</p>
            </div>
          </>
        )}
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
          href={`/profile/${props.id}`}
          className='d-flex align-items-center px-3 py-2'
        >
          <i className='material-icons-sharp mr-2'>person</i>
          <small>My profile</small>
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
  id: string
  name?: string
  image?: string
  setUser: Function
}
