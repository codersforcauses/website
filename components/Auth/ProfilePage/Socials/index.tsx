import { memo } from 'react'
import SocialsConnected, { SocialsConnectedProps } from './SocialConnected'

const icons: Array<SocialsConnectedProps> = [
  {
    name: 'GitHub',
    icon: 'github',
    socialLink: 'username'
  },
  {
    name: 'GitLab',
    icon: 'gitlab',
    socialLink: 'username'
  },
  {
    name: 'Bitbucket',
    icon: 'bitbucket'
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    dimensions: 20,
    socialLink: 'username'
  },
  {
    name: 'Discord',
    icon: 'discord',
    socialLink: 'username'
  }
]

const filter = (socials: Array<SocialsConnectedProps>) => {
  const sortCompare = (
    { icon: iconA }: SocialsConnectedProps,
    { icon: iconB }: SocialsConnectedProps
  ) => {
    if (iconA < iconB) return -1
    if (iconA > iconB) return 1
    return 0
  }

  const valid: Array<SocialsConnectedProps> = [],
    invalid: Array<SocialsConnectedProps> = []

  socials.sort(sortCompare).forEach(social => {
    typeof social.socialLink === 'string'
      ? valid.push(social)
      : invalid.push(social)
  })

  return valid.concat(invalid)
}

const Socials = ({ isEditing }: { isEditing: boolean }) => (
  <div className='space-y-3'>
    <p className='font-black'>
      {isEditing ? 'Link Socials' : 'Socials Connected'}
    </p>
    <div className='grid grid-cols-1 gap-2'>
      {filter(icons).map(icon => (
        <SocialsConnected key={icon.name} {...icon} isEditing={isEditing} />
      ))}
    </div>
  </div>
)

export default memo(Socials)
