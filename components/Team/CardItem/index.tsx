import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, CardProps } from 'reactstrap'

export default function (props: Props) {
  const { item } = props
  const { name, position, about, social, picture } = item
  return (
    <Card className='m-3 border-0'>
      {style}
      <CardImg top width='100%' src={picture.src} alt={picture.alt} />
      <CardBody className='px-0'>
        <CardTitle className='font-weight-bolder text-monospace'>
          {name}
        </CardTitle>
        <CardSubtitle className='mb-1'>
          {position}
        </CardSubtitle>
        <CardText className='mb-1'>
          {about}
        </CardText>
        <CardText className='mb-1'>
          <a href={'mailto:' + social.email} className='text-muted' title={social.email}>
            <i className='fas fa-envelope icon' />
          </a>
          {social.github !== undefined &&
            <a target='_blank' href={social.github} className='text-muted'>
              <i className='fab fa-github-square icon' />
            </a>
          }
          {social.gitlab !== undefined &&
            <a target='_blank' href={social.gitlab} className='text-muted'>
              <i className='fab fa-gitlab icon' />
            </a>
          }
          {social.bitbucket !== undefined &&
            <a target='_blank' href={social.bitbucket} className='text-muted'>
              <i className='fab fa-bitbucket icon' />
            </a>
          }
          {social.linkedin !== undefined &&
            <a target='_blank' href={social.linkedin} className='text-muted'>
              <i className='fab fa-linkedin icon' />
            </a>
          }
          {social.facebook !== undefined &&
            <a target='_blank' href={social.facebook} className='text-muted'>
              <i className='fab fa-facebook icon' />
            </a>
          }
          {social.twitter !== undefined &&
            <a target='_blank' href={social.twitter} className='text-muted'>
              <i className='fab fa-twitter-square icon' />
            </a>
          }
        </CardText>
      </CardBody>
    </Card>
  )
}
const style = (
  <style jsx>{`
    .icon {
      font-size: 1.4rem;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
    .icon:hover {
      color: black;
    }
  `}</style>
)
interface Props extends CardProps {
  item: CardItemContent
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
