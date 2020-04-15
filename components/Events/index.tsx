import React from 'react'

import EventCard from './EventCard'

import style from './style'

type EventItemProps = {
  id: number
  type: string
  img: string
  title: string
  description: string
  requirements: string[]
  location: string
  date: string
}

type EventProps = {
  type: string
  direction: string
  events: EventItemProps[]
}

const Events = (props: EventProps) => (
  <>
    {style(props.direction)}
    <a id={props.type} />
    <div
      className='row mb-4'
      style={{
        flexDirection: props.direction === 'right' ? 'row' : 'row-reverse'
      }}
    >
      <div className='m-auto p-2 col-sm-12 col-md-6 col-lg-4'>

        <h1
          className='mb-0'
          style={{ textAlign: props.direction === 'right' ? 'left' : 'right' }}
        >
          {props.type}
        </h1>
      </div>
      {props.events
        .sort((e1, e2) => compareEventsByDate(e1, e2))
        .map(event => (
          <EventCard
            key={event.id}
            id={event.id}
            img={event.img}
            title={event.title}
            description={event.description}
          />
        ))}
    </div>
  </>
)

type eventObject = {
  date: string
}

const compareEventsByDate = (eventA: eventObject, eventB: eventObject) => {
  const dateA = new Date(eventA.date)
  const dateB = new Date(eventB.date)

  if (dateA > dateB) return 1
  else if (dateA < dateB) return -1
  else return 0
}

export default Events
