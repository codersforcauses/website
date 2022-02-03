import { GetServerSideProps } from 'next'
import Meta from '@components/Utils/Meta'
import EventsPage, { EventsProps } from '@components/Events/EventsPage'

const Events = (props: EventsProps) => (
  <>
    <Meta
      title='Events'
      name='Events'
      page='events'
      description='Check out upcoming, ongoing and historical events run by Coders for Causes.'
      image='https://og-social-cards.vercel.app/**.%2Fevents**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
    />
    <EventsPage {...props} />
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    current: Number(query?.past !== '')
  }
})

export default Events
