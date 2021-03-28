import { useTheme } from '@emotion/react'
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

const iconMap = {
  github: <i className='fab fa-github-square icon' />,
  gitlab: <i className='fab fa-gitlab icon' />,
  bitbucket: <i className='fab fa-bitbucket icon' />,
  linkedin: <i className='fab fa-linkedin icon' />,
  facebook: <i className='fab fa-facebook icon' />,
  twitter: <i className='fab fa-twitter-square icon' />
}

const replaceImage = (src: string, nameList: Array<string>, prob: number) => {
  if (
    nameList.some((name: string) => src.includes(name)) &&
    Math.random() < prob
  ) {
    return src.split('.')[0].concat('-1').concat('.jpg')
  }
  return src
}

const CommitteeCard = ({
  item: {
    name,
    position,
    about,
    social,
    picture: { src, alt }
  }
}: Props) => {
  const theme = useTheme()

  return (
    <Card inverse className='border-0 rounded-0' css={styles(theme)}>
      <CardImg
        width='100%'
        src={replaceImage(src, ['jerry'], 0.05)}
        alt={alt}
        className='rounded-0 flex-grow-1'
      />
      <CardImgOverlay className='bg-primary card-overlay rounded-0'>
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
          {Object.keys(social)
            .filter(key => key !== 'email')
            .map(item => (
              <a
                key={item}
                target='_blank'
                rel='noopener noreferrer'
                href={social[item]}
                className='text-muted'
              >
                {iconMap[item]}
              </a>
            ))}
        </CardText>
      </CardImgOverlay>
    </Card>
  )
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

interface Props extends CardProps {
  item: CardItemContent
}

export default CommitteeCard
