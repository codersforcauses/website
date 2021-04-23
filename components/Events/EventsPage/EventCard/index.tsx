/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext } from 'react'
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
import Image from 'next/image'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'

const EventCard = (props: any) => {
  const theme = useTheme()
  const isDark = useContext(DarkContext)

  return (
    <Card
      className={`rounded-0 border-0 ${props.className}`}
      css={styles(theme, isDark)}
    >
      <div className='position-relative'>
        <Image
          eager
          {...props.image}
          layout='fill'
          objectFit='cover'
          objectPosition='center top'
        />
      </div>
      <CardBody className='px-4 py-3'>
        <div className='mb-2'>
          {props.tags?.map(tag => (
            <Badge
              key={tag}
              color='white'
              className={`rounded-0 mr-2 font-weight-light border border-${
                isDark ? 'dark' : 'muted'
              } text-muted`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className='text-monospace heading'>{props.title}</CardTitle>
        <CardSubtitle className='mb-2'>Time: {props.time}</CardSubtitle>
        <CardSubtitle className='mb-2'>Location: {props.location}</CardSubtitle>
        <CardText className='smaller'>{props.desc}</CardText>
        {/* <Link href={`/events/${props.slug}`}>
          <Button outline={isDark} color={isDark ? 'secondary' : 'primary'} className='rounded-0'>
            Learn more
          </Button>
        </Link> */}
      </CardBody>
    </Card>
  )
}

export default EventCard
