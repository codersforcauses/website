/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useCallback, useContext, useState, useMemo } from 'react'
import { Container, Button, ButtonGroup } from 'reactstrap'
import day from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Title from 'components/Utils/Title'
import { DarkContext } from 'helpers/user'
import EventCard from './EventCard'
import { styles, eventStyles } from './styles'
import eventList from '../../../data/events.json'
day.extend(customParseFormat)

const EventPage = () => {
  const [eventPast, setEventPast] = useState(false)
  const theme = useTheme()
  const isDark = useContext(DarkContext)

  const toggleEventPast = useCallback(() => setEventPast(true), [])
  const toggleEventUpcoming = useCallback(() => setEventPast(false), [])

  const events = useMemo(() => eventList.filter((event) => {
    const date = day(event.date, 'DD/MM/YY')
    if (eventPast) return date.isBefore(day())
    else return date.isAfter(day()) || date.isSame(day())
  }).sort((event1, event2) => {
    console.log(event1)
    const date1 = day(event1.date + event1.time, 'DD/MM/YYh:mma')
    const date2 = day(event2.date + event2.time, 'DD/MM/YYh:mma')
    if (date1.isAfter(date2, 'day')) return eventPast ? -1 : 1
    if (date1.isBefore(date2, 'day')) return eventPast ? 1 : -1
    if (date1.isSame(date2, 'day')) return date1.isBefore(date2) ? -1 : 1
    else return 0
  }), [eventList, eventPast])

  return (
    <div css={styles(theme)}>
      <Title typed>./events</Title>
      <Container className='my-md-5 py-5 bg-transparent rounded-0'>
        <ButtonGroup className='mb-5'>
          <Button
            outline={!eventPast}
            color={isDark ? 'secondary' : 'primary'}
            className='rounded-0 text-monospace px-4'
            onClick={toggleEventPast}
          >
            Past
          </Button>
          <Button
            outline={eventPast}
            color={isDark ? 'secondary' : 'primary'}
            className='rounded-0 text-monospace px-3'
            onClick={toggleEventUpcoming}
          >
            Upcoming
          </Button>
        </ButtonGroup>
        <div className='events'>
          {events.map((event) => (
            <div key={event.date + event.time} css={eventStyles(theme, isDark, event.date)}>
              <div className='d-flex flex-column ml-3 ml-md-5 pl-lg-5'>
                <EventCard key={event.slug} className='mb-4' {...event} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default EventPage
