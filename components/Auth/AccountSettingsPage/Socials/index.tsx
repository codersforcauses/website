/** @jsx jsx */
import { jsx } from '@emotion/core'
import { memo } from 'react'
import SocialsConnected, { SocialsConnectedProps } from './SocialConnected'
import { style } from './styles'

const icons: Array<SocialsConnectedProps> = [
  {
    name: 'GitHub',
    icon: 'github',
    color: '#24292e',
    socialLink: 'username'
  },
  {
    name: 'GitLab',
    icon: 'gitlab',
    color: '#6b4fbb'
  },
  {
    name: 'Bitbucket',
    icon: 'bitbucket',
    color: '#0052cc'
    // socialLink: 'username'
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#2977c9',
    dimensions: 20,
    socialLink: 'username'
  },
  {
    name: 'Discord',
    icon: 'discord',
    color: '#7289da',
    socialLink: 'username'
  }
]

const compare = (a: SocialsConnectedProps, b: SocialsConnectedProps) => {
  if (typeof a.socialLink === 'string') return -1
  if (typeof a.socialLink !== 'string') return 1
  return 0
}

const Socials = ({ isEditing }: { isEditing: boolean }) => (
  <>
    <p>Link Socials</p>
    <div css={style}>
      {icons.sort(compare).map(icon => (
        <SocialsConnected key={icon.name} {...icon} isEditing={isEditing} />
      ))}
    </div>
  </>
)

export default memo(Socials)
