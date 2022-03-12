import Image from 'next/image'
import Link from 'next/link'
import { ImageProps } from '@lib/types'

const EventPage = ({ data }: Props) => (
  <>
    <div className='relative z-10 py-12 space-y-24 font-mono font-black bg-primary text-secondary'>
      <nav className='container px-3 mx-auto text-sm'>
        <Link href='/events'>
          <a className='text-secondary hover:underline'>Events</a>
        </Link>
        <span className='text-secondary text-opacity-60'>{` / ${data.title}`}</span>
      </nav>
      <div className='container px-3 mx-auto space-y-4'>
        <p className='font-black capitalize'>./{data?.type ?? 'Workshop'}</p>
        <h1 className='w-3/4 text-6xl'>{data.title}</h1>
      </div>
    </div>
    <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
      <div className='container px-3 mx-auto space-y-8'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <div className='relative h-72'>
            <Image
              src={data.image.src}
              alt={data.image.alt}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div>
            <p className='mb-6 md:text-lg'>{data.desc}</p>
            {/* {data.isPaid && (
                <a href='' className='px-4 py-2 text-xl filled-button'>
                  Buy Tickets
                </a>
              )} */}
          </div>
        </div>
        <div className='grid grid-cols-3'>
          <div>
            <h2 className='font-black'>What to bring</h2>
            <ol className='list-decimal list-inside'>
              <li>Your enthusiasm</li>
              <li>Your laptop</li>
            </ol>
          </div>
          <div>
            <h2 className='font-black'>Where</h2>
            <p>
              The Circle (Reid Library) <br /> UWA Crawley Campus
            </p>
          </div>
          <div>
            <h2 className='font-black'>When</h2>
            <p>
              Tuesday 18th March <br /> 3:30pm - 4:30pm
            </p>
          </div>
        </div>
        <div className='grid gap-8 p-8 font-mono md:grid-cols-4 bg-primary text-secondary'>
          <span className='grid select-none material-icons-sharp text-8xl place-self-center'>
            {data?.isPaid ? 'attach_money' : 'money_off'}
          </span>
          <div className='w-10/12 space-y-4 md:col-span-3'>
            <p className='text-xl font-black'>
              {data?.isPaid
                ? 'This event is paid'
                : 'Our workshops are always free!'}
            </p>
            <p>
              As part of our commitment to empower students for a successful
              career in the software industry, Coders for Causes
              {data?.isPaid
                ? ' hosts this event '
                : ' host free workshops covering a variety of topics '}
              to supercharge your career.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export interface EventType {
  slug: string
  tags: Array<string>
  title: string
  image: ImageProps
  date: string
  time: {
    start: string
    end: string
  }
  location: string
  desc: string
  type?: 'workshop' | 'industry night' | 'social event'
  isPaid?: boolean
}

interface Props {
  data: EventType
}

export default EventPage
