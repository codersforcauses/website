import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import day from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Title from '@components/Utils/Title'
import eventList from '@data/events.json'
import EventCard from './EventCard'
day.extend(customParseFormat)

const sorted = (array: Array<Event>) =>
  array.sort((event1, event2) => {
    const eventDate = ({ date, time }: Event) =>
      day(date + time, 'DD/MM/YYh:mma')
    return eventDate(event1).isAfter(eventDate(event2)) ? 1 : -1
  })

const events = {
  past: sorted(
    eventList.filter(event => day(event.date, 'DD/MM/YY').isBefore(day()))
  ),
  upcoming: sorted(
    eventList.filter(event => {
      const date = day(event.date, 'DD/MM/YY')
      return date.isAfter(day()) || date.isSame(day())
    })
  )
}

const EventPage = () => {
  const isPast = useRouter()?.query?.past === undefined

  return (
    <>
      <Title typed>./events</Title>
      <div className='py-12 md:py-24 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <Tab.Group defaultIndex={Number(!isPast)}>
            <Tab.List className='mb-12 border max-w-max'>
              {Object.keys(events).map(text => (
                <Tab
                  key={text}
                  className={({ selected }) =>
                    `font-mono font-black px-4 py-2 focus:outline-none focus:ring-inset focus:ring focus:ring-accent capitalize ${
                      selected &&
                      'bg-primary text-secondary dark:bg-secondary dark:text-primary'
                    }`
                  }
                >
                  {text}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels as={Fragment}>
              {Object.values(events).map((events, idx) => (
                <Tab.Panel
                  key={idx}
                  className='relative space-y-6 focus:outline-none'
                >
                  {events.length === 0 ? (
                    <h2 className='font-mono text-4xl font-black'>
                      {!idx ? 'No past events' : 'No events planned yet'}
                    </h2>
                  ) : (
                    events.map(event => (
                      <div
                        key={event.date + event.time}
                        className='relative border-l border-opacity-40 border-primary dark:border-secondary dark:border-opacity-40'
                      >
                        <span className='absolute left-0 px-4 font-mono text-lg transform rotate-90 -translate-x-1/2 translate-y-full lg:rotate-0 lg:translate-y-0 bg-secondary dark:bg-alt-dark'>
                          {event.date}
                        </span>
                        <EventCard key={event.slug} {...event} />
                      </div>
                    ))
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}

export default EventPage

interface Event {
  slug: string
  tags: string[]
  title: string
  image: {
    src: string
    alt: string
  }
  date: string
  time: {
    start: string
    end: string
  }
  location: string
  desc: string
}
