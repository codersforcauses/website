import { useEffect, useState, useMemo } from 'react'
import { Switch } from '@headlessui/react'
import day from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useRouter } from 'next/router'
import Title from '@components/Utils/Title'
import eventList from '@data/events.json'
import EventCard from './EventCard'
day.extend(customParseFormat)

const EventPage = () => {
  const router = useRouter()
  const [eventPast, setEventPast] = useState(false)

  useEffect(() => {
    setEventPast(router?.query?.past !== undefined)
  }, [router?.query?.past])

  const events = useMemo(
    () =>
      eventList
        .filter(event => {
          const date = day(event.date, 'DD/MM/YY')
          if (eventPast) return date.isBefore(day())
          else return date.isAfter(day()) || date.isSame(day())
        })
        .sort((event1, event2) => {
          const date1 = day(event1.date + event1.time, 'DD/MM/YYh:mma')
          const date2 = day(event2.date + event2.time, 'DD/MM/YYh:mma')
          if (date1.isAfter(date2, 'day')) return eventPast ? -1 : 1
          if (date1.isBefore(date2, 'day')) return eventPast ? 1 : -1
          if (date1.isSame(date2, 'day')) return date1.isBefore(date2) ? -1 : 1
          else return 0
        }),
    [eventPast]
  )

  return (
    <>
      <Title typed>./events</Title>
      <div className='py-12 md:py-24 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <Switch
            checked={eventPast}
            onChange={setEventPast}
            className='relative inline-flex flex-shrink-0 w-64 h-10 mb-12 transition-colors duration-200 ease-in-out bg-transparent border cursor-pointer border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-secondary'
          >
            <span className='sr-only'>Event timeline switcher</span>
            <span className='absolute flex items-center w-full h-full font-mono text-lg font-black z-5'>
              <span
                className={`${
                  eventPast ? 'text-secondary dark:text-primary' : ''
                } w-1/2`}
              >
                Past
              </span>
              <span
                className={`${
                  !eventPast ? 'text-secondary dark:text-primary' : ''
                } w-1/2`}
              >
                Upcoming
              </span>
            </span>
            <span
              aria-hidden='true'
              className={`${
                eventPast ? 'translate-x-0' : 'translate-x-full'
              } inline-block w-1/2 h-full transition duration-200 ease-in-out transform pointer-events-none bg-primary ring-0 dark:bg-secondary`}
            />
          </Switch>
          {events.length === 0 ? (
            <h2 className='font-mono text-4xl font-black'>
              {eventPast ? 'No past events' : 'No events planned yet'}
            </h2>
          ) : (
            <div className='space-y-8'>
              {events.map(event => (
                <div
                  key={event.date + event.time}
                  className='relative border-l border-opacity-40 border-primary dark:border-secondary dark:border-opacity-40'
                >
                  <span className='absolute left-0 px-4 font-mono text-lg transform rotate-90 -translate-x-1/2 translate-y-full lg:pb-4 lg:rotate-0 lg:translate-y-0 bg-secondary dark:bg-alt-dark'>
                    {event.date}
                  </span>
                  <div className='flex flex-col ml-4 lg:ml-20'>
                    <EventCard key={event.slug} {...event} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default EventPage
