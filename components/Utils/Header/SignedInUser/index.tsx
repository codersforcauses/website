/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { useState } from 'react'
import { Auth } from 'aws-amplify'
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Router from 'next/router'
import { getInitials } from 'helpers/user'
import { styles } from './styles'

const Avatar = ({ name, setUser, ...props }: Props) => {
  const [dropdown, setDropdown] = useState(false)

  const initials = getInitials(name)

  const handleSignOut = async () => {
    await Auth.signOut()
    setUser(null)
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
          css={styles(props.theme, props.image)}
        >
          {name && <p className='m-0'>{initials}</p>}
        </div>
      </DropdownToggle>
      <DropdownMenu className='rounded-0'>
        <DropdownItem tag='small'>User Settings</DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag='small' onClick={handleSignOut}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  )
}

export default withTheme(Avatar)

interface Props {
  name?: string
  image?: string
  setUser: Function
  theme: Object
}
