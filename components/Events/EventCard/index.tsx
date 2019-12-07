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

const EventCard = ({ id, img, title, description }: EventCardProps) => {
  const descriptionLength = 150
  const descTrimmed =
    description !== undefined && description.length > descriptionLength
      ? description.substring(0, descriptionLength) + '...'
      : description

  return (
    <>
      {style}
      <div className='p-2 col-sm-12 col-md-6 col-lg-4'>
        <Card className='event-card'>
          <CardImg top src={img} />
          <CardBody>
            <CardTitle>
              <h1 className='title'>{title}</h1>
            </CardTitle>
            <CardText className='description'>{descTrimmed}</CardText>
          </CardBody>
          <div>
            <Link href={'/event/' + id}>
              <Button className='button'>Learn more</Button>
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}

export default EventCard
