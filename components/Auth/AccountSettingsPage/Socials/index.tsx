/** @jsx jsx */
import { jsx } from '@emotion/core'
import SocialsConnected, { SocialsConnectedProps } from './SocialConnected'
import { style } from './styles'

const icons: Array<SocialsConnectedProps> = [
  {
    name: 'GitHub',
    icon: 'github',
    color: '#24292e'
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
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#2977c9',
    dimensions: 20
  },
  {
    name: 'Discord',
    icon: 'discord',
    color: '#7289da'
  }
]
const Socials = () => (
  <>
    <p>Link Socials</p>
    <div css={style}>
      {icons.map(icon => (
        <SocialsConnected key={icon.name} {...icon} />
      ))}
    </div>
  </>
)

export default Socials
