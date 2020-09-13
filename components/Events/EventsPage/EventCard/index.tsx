/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle
} from 'reactstrap'
import Link from 'next/link'
import { styles } from './styles'

const EventCard = (props: any) => {
  const theme = useTheme()

  return (
    <Card
      outline
      color='secondary'
      className={`rounded-0 ${props.className}`}
      css={styles(theme, props.image?.src)}
    >
      <div className='event-img'>
        <span className='sr-only'>{props.image?.alt}</span>
      </div>
      <CardBody className='px-4 py-3 bg-light'>
        <div className='mb-2'>
          {props.tags?.map(tag => (
            <Badge
              key={tag}
              color='white'
              className='rounded-0 mr-2 text-muted border border-muted font-weight-light'
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className='text-monospace heading'>{props.title}</CardTitle>
        <CardSubtitle className='mb-2'>Time: {props.time}</CardSubtitle>
        <CardSubtitle className='mb-2'>Location: {props.location}</CardSubtitle>
        <CardText className='smaller'>{props.desc}</CardText>
        <Link href={`/events/${props.slug}`}>
          <Button color='primary' className='rounded-0'>
            Learn more
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}

export default EventCard
