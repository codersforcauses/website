import { jsx } from '@emotion/react'
import { memo, useContext } from 'react'
import { Button } from 'reactstrap'
import SocialIcons, { iconsList } from 'components/Elements/SocialIcons'
import { DarkContext } from 'helpers/user'
import { buttonStyle, connectedStyle } from './styles'

const SocialsConnected = ({
  color,
  dimensions = 24,
  fill = 'secondary',
  socialLink,
  ...props
}: SocialsConnectedProps & { isEditing: boolean }) => {
  const isDark = useContext(DarkContext)
  return socialLink
    ? (
    <div
      className={`rounded-0 py-2 px-4 position-relative d-flex align-items-center justify-content-center text-${
        isDark ? 'secondary' : 'primary'
      }`}
      css={connectedStyle(color)}
    >
      <SocialIcons
        dimensions={dimensions}
        fill={isDark ? 'secondary' : 'primary'}
        icon={props.icon}
        className='icon'
      />
      {socialLink}
      {props.isEditing && (
        <Button outline color='danger' className='rounded-0 delete'>
          <i className='material-icons-sharp'>delete_outline</i>
        </Button>
      )}
    </div>
      )
    : props.isEditing
      ? (
    <Button
      block
      size='lg'
      className={`rounded-0 m-0 px-4 position-relative d-flex align-items-center justify-content-center text-${fill}`}
      css={buttonStyle(color)}
    >
      <SocialIcons
        dimensions={dimensions}
        fill={fill}
        icon={props.icon}
        className='icon'
      />
      {props.name}
    </Button>
        )
      : null
}

export default memo(SocialsConnected)

export interface SocialsConnectedProps {
  color: string
  name: string
  icon: keyof typeof iconsList
  fill?: 'primary' | 'secondary'
  dimensions?: number
  socialLink?: string | boolean
}
