/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle
} from 'reactstrap'
import Link from 'next/link'
import { styles } from './styles'

const EventCard = (props: { theme: Object }) => (
  <Card
    outline
    color='secondary'
    className='rounded-0'
    css={styles(props.theme)}
  >
    <CardImg
      top
      width='100%'
      src='https://source.unsplash.com/random'
      // {props.event.logo}
      // alt={props.event.client}
      className='img-fluid rounded-0 event-img'
    />
    <CardBody className='bg-light'>
      <div className='mb-2'>
        {['workshop', 'social'].map(event => (
          <Badge
            key={event}
            color='white'
            className='rounded-0 mr-2 text-muted border border-muted font-weight-light'
          >
            {event}
          </Badge>
        ))}
      </div>
      <CardTitle className='monospace heading'>
        Essential Software Industry Skills
      </CardTitle>
      <CardText className='smaller'>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </CardText>
      <Link href='/events/essential_software_industry_skills'>
        <Button color='primary' className='rounded-0'>
          Learn more
        </Button>
      </Link>
    </CardBody>
  </Card>
)

export default withTheme(EventCard)
