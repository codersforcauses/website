/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardSubtitle,
  CardText,
  CardProps
} from 'reactstrap'
import { styles } from './styles'

const CommitteeCard = ({
  item: {
    name,
    position,
    about,
    social,
    picture: { src, alt }
  },
  ...props
}: Props) => (
  <Card inverse className='border-0 rounded-0' css={styles(props.theme)}>
    <CardImg width='100%' src={src} alt={alt} className='rounded-0' />
    <CardImgOverlay className='bg-primary card-overlay'>
      <CardTitle className='font-weight-bolder text-monospace'>
        {name}
      </CardTitle>
      <CardSubtitle className='mb-1'>{position}</CardSubtitle>
      <CardText className='mb-1'>{about}</CardText>
      <CardText className='mb-1'>
        <a
          href={'mailto:' + social.email}
          className='text-muted'
          title={social.email}
        >
          <i className='fas fa-envelope icon' />
        </a>
        {social.github && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={social.github}
            className='text-muted'
          >
            <i className='fab fa-github-square icon' />
          </a>
        )}
        {social.gitlab && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={social.gitlab}
            className='text-muted'
          >
            <i className='fab fa-gitlab icon' />
          </a>
        )}
        {social.bitbucket && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={social.bitbucket}
            className='text-muted'
          >
            <i className='fab fa-bitbucket icon' />
          </a>
        )}
        {social.linkedin && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={social.linkedin}
            className='text-muted'
          >
            <i className='fab fa-linkedin icon' />
          </a>
        )}
        {social.facebook && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={social.facebook}
            className='text-muted'
          >
            <i className='fab fa-facebook icon' />
          </a>
        )}
        {social.twitter && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={social.twitter}
            className='text-muted'
          >
            <i className='fab fa-twitter-square icon' />
          </a>
        )}
      </CardText>
    </CardImgOverlay>
  </Card>
)

interface Props extends CardProps {
  item: CardItemContent
  theme: Object
}

interface Social {
  email: string
  discord: string
  github?: string
  gitlab?: string
  bitbucket?: string
  linkedin?: string
  facebook?: string
  twitter?: string
}

interface Picture {
  src: string
  alt: string
}

export interface CardItemContent {
  name: string
  position: string
  about: string
  social: Social
  picture: Picture
}

export default withTheme(CommitteeCard)
