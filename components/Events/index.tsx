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

// TODO: sort by date
const Events = (props: EventProps) => (
  <>
    {style(props.direction)}
    <div
      className="row"
      style={{
        flexDirection: props.direction === 'right' ? 'row' : 'row-reverse'
      }}
    >
      <div className="event-type event-item col-sm-12 col-md-6 col-lg-4">
        <h1
          style={{ textAlign: props.direction === 'right' ? 'left' : 'right' }}
        >
          {props.type}
        </h1>
      </div>
      {props.events.map(event => (
        <div className="event-item col-sm-12 col-md-6 col-lg-4">
          <EventCard
            key={event.id}
            id={event.id}
            img={event.img}
            title={event.title}
            description={event.description}
          />
        </div>
      ))}
    </div>
  </>
)

export default Events
