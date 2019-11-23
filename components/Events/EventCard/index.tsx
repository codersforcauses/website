import React from 'react'
import Link from 'next/link'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'

import style from './style'

type EventCardProps = {
  id: number
  img: string
  title: string
  description: string
}

const EventCard = ({ id, img, title, description }: EventCardProps) => (
  <>
    {style}
    <Card className="event-card">
      <CardImg top src={img}></CardImg>
      <CardBody>
        <CardTitle>
          <h1 className="title">{title}</h1>
        </CardTitle>
        <CardText className="description">{description}</CardText>
        <Link href={'/event/' + id}>
          <Button className="button">Learn more</Button>
        </Link>
      </CardBody>
    </Card>
  </>
)

export default EventCard
