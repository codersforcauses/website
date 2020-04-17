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
import { getInitials } from '../../../helpers/user'
import { style } from './style'

const Avatar = ({
  dark = true,
  round = false,
  size = 'sm',
  ...props
}: Props) => {
  const [dropdown, setDropdown] = useState(false)

  const initials = getInitials(props.name)

  const handleSignOut = async () => {
    await Auth.signOut()
    // setUser(null)
    Router.push('/dashboard')
  }

  return (
    <ButtonDropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
      <DropdownToggle
        color={dark ? 'primary' : 'secondary'}
        className='d-flex align-items-center rounded-0 p-0'
      >
        <p className='m-0 d-none d-md-block'>{props.name && props.name}</p>
        <div
          className={`d-flex align-items-center justify-content-center ml-2 monospace ${
            round && 'rounded-circle'
          } ${props.className}`}
          css={style(props.theme, size, dark, props.image)}
        >
          {props.name && <p className='m-0'>{initials}</p>}
        </div>
      </DropdownToggle>
      <DropdownMenu className='rounded-0'>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  )
}

export default withTheme(Avatar)

interface Props {
  dark?: Boolean
  round?: Boolean
  name?: string
  image?: string
  size?: string
  className?: string
  theme: Object
}
