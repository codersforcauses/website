/** @jsxImportSource @emotion/react */
import { memo, useCallback, useContext, useState } from 'react'
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
  const [username, setUsername] = useState('')
  const [addSocial, setAddSocial] = useState(false)
  const toggle = useCallback(() => setAddSocial(prev => !prev), [])
  const isDark = useContext(DarkContext)

  if (socialLink) {
    return (
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
          <Button outline color='danger' className='rounded-0 icon-button'>
            <i className='material-icons-sharp'>delete_outline</i>
          </Button>
        )}
      </div>
    )
  } else if (props.isEditing) {
    return addSocial ? (
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
        <div className='position-relative'>
          <input
            autoFocus
            name={`${props.name}-username`}
            className={`bg-transparent border-0 mx-5 text-${
              isDark ? 'secondary' : 'primary'
            }`}
          />
          <Button
            outline
            color='danger'
            className='rounded-0 icon-button'
            onClick={toggle}
          >
            <i className='material-icons-sharp'>close</i>
          </Button>
        </div>
        <Button
          outline
          color={isDark ? 'secondary' : 'primary'}
          className='rounded-0 icon-button'
          onClick={toggle}
        >
          <i className='material-icons-sharp'>check</i>
        </Button>
      </div>
    ) : (
      <Button
        block
        size='lg'
        className={`rounded-0 m-0 px-4 position-relative d-flex align-items-center justify-content-center text-${fill}`}
        css={buttonStyle(color)}
        onClick={toggle}
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
  } else return null
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
