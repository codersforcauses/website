import Link from 'next/link'
import Image from 'next/image'
import { EventType } from '@components/Events/EventPage'

const EventCard = (event: Omit<EventType, 'type'>) => {
  return (
    <div className='grid grid-cols-5 grid-rows-2 bg-alt-light lg:grid-rows-1 dark:bg-primary'>
      <div className='relative col-span-full lg:col-span-2'>
        <Image
          loading='eager'
          src={event.image.src}
          alt={event.image.alt}
          layout='fill'
          objectFit='cover'
          objectPosition='center top'
        />
      </div>
      <div className='px-6 py-4 space-y-2 col-span-full lg:col-span-3'>
        <div className='space-x-2'>
          {event.tags?.map(tag => (
            <span
              key={tag}
              className='px-1 py-0.5 opacity-70 text-xs border border-primary border-opacity-25 dark:border-alt-light dark:border-opacity-30'
            >
              {tag}
            </span>
          ))}
        </div>
        <p className='font-mono text-2xl font-black'>{event.title}</p>
        <div>
          <p>Time: {event.time.start}</p>
          <p>Location: {event.location}</p>
        </div>
        <p>{event.desc}</p>
        {/* <div className='pt-2'>
          <Link href={`/events/${event.slug}`}>
            <a className='grid px-4 py-2 font-mono font-black bg-transparent border max-w-max place-items-center border-primary text-primary hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-primary dark:focus:bg-secondary dark:focus:text-primary focus:outline-none'>
              Learn more
            </a>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default EventCard
