import { useEffect, useState, Fragment } from 'react'
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
    const date1 = day(event1.date + event1.time, 'DD/MM/YYh:mma')
    const date2 = day(event2.date + event2.time, 'DD/MM/YYh:mma')
    if (date1.isAfter(date2, 'day')) return 1
    if (date1.isBefore(date2, 'day')) return -1
    if (date1.isSame(date2, 'day')) return date1.isBefore(date2) ? -1 : 1
    else return 0
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
  const router = useRouter()
  const [eventPast, setEventPast] = useState(false)

  useEffect(() => {
    setEventPast(router?.query?.past === undefined)
  })

  return (
    <>
      <Title typed>./events</Title>
      <div className='py-12 md:py-24 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <Tab.Group defaultIndex={Number(!eventPast)}>
            <Tab.List className='mb-12 border max-w-max'>
              {Object.keys(events).map(text => (
                <Tab
                  key={text}
                  className={({ selected }) =>
                    `font-mono font-black px-4 py-2 focus:outline-none capitalize ${
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
                <Tab.Panel key={idx}>
                  {events.length === 0 ? (
                    <h2 className='font-mono text-4xl font-black'>
                      { !idx ? 'No past events' : 'No events planned yet'}
                    </h2>
                  ) : (
                    events.map(event => (
                      <div
                        key={event.date + event.time}
                        className='relative space-y-12 border-l border-opacity-40 border-primary dark:border-secondary dark:border-opacity-40'
                      >
                        <span className='absolute left-0 px-4 font-mono text-lg transform rotate-90 -translate-x-1/2 translate-y-full lg:pb-4 lg:rotate-0 lg:translate-y-0 bg-secondary dark:bg-alt-dark'>
                          {event.date}
                        </span>
                        <div className='flex flex-col ml-4 lg:ml-20'>
                          <EventCard key={event.slug} {...event} />
                        </div>
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
