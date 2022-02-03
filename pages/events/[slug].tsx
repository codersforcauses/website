import { GetServerSideProps } from 'next'
import Meta from '@components/Utils/Meta'
import EventPage, { EventType } from '@components/Events/EventPage'
import events from '@data/events.json'

const Event = ({ event }: { event: EventType }) => (
  <>
    <Meta
      title={event.title}
      name={`Event: ${event.title}`}
      page={`events/${event.slug}`}
      description={event.desc}
      image={`https://og-social-cards.vercel.app/**.%2F${event.slug}**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg`}
    />
    <EventPage data={event} />
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const event = events.find(({ slug }) => slug === params?.slug)

  return event ? { props: { event } } : { notFound: true }
}

export default Event
