/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Button } from 'reactstrap'
import SocialIcons, { iconsList } from 'components/Elements/SocialIcons'
import { style } from './styles'

const SocialsConnected = ({
  color,
  dimensions = 24,
  fill = 'secondary',
  ...props
}: SocialsConnectedProps) => (
  <Button
    block
    size='lg'
    className='rounded-0 px-4 position-relative text-secondary d-flex align-items-center justify-content-center'
    css={style(color)}
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

export default SocialsConnected

export interface SocialsConnectedProps {
  color: string
  name: string
  icon: keyof typeof iconsList
  fill?: 'primary' | 'secondary'
  dimensions?: number
}
