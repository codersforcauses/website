/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle
} from 'reactstrap'
import Link from 'next/link'
import { style } from './style'

const EventCard = (props: { theme: Object }) => (
  <Card outline color='primary' css={style(props.theme)}>
    <CardImg
      top
      width='100%'
      src='https://source.unsplash.com/random'
      // {props.event.logo}
      // alt={props.event.client}
      className='img-fluid event-img'
    />
    <CardBody>
      <CardTitle className='monospace heading'>
        Essential Software Industry Skills
      </CardTitle>
      <CardText className='smaller'>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </CardText>
      <Link href='/events/ignite_mentoring'>
        <Button color='primary'>Learn more</Button>
      </Link>
    </CardBody>
  </Card>
)

export default withTheme(EventCard)
