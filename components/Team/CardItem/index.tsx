import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, CardProps, Button } from 'reactstrap'

export default function (props: Props) {
  const { item } = props
  const { name, position, about, social, picture } = item
  return (
    <Card className='m-3'>
      <CardImg top width='100%' src={picture.src} alt={picture.alt} />
      <CardBody>
        <CardTitle className='font-weight-bolder text-monospace'>
          {position}
        </CardTitle>
        <CardSubtitle>{name}</CardSubtitle>
        <CardText>{about}</CardText>
        <Button color='link'>link</Button>
      </CardBody>
    </Card>
  )
}

interface Props extends CardProps {
  item: CardItemContent
}

interface Link {
  name: string
  href: string
}

interface Social {
  email?: string
  discord: string
  github: Link
  gitlabs?: Link
  bitbucket?: Link
  facebook?: Link
  linkedin?: Link
  twitter?: Link
  website?: Link
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
