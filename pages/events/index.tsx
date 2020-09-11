import React from 'react'
import Seo from 'components/Utils/SEO'
import Head from 'next/head'
import EventsPage from 'components/Events/EventsPage'

const Events = () => (
  <>
    <Head>
      <title>Events | Coders for Causes</title>
      <Seo
        title='Events'
        page='events'
        description='Check out upcoming, ongoing and historical events run by Coders for Causes.'
        image='https://og-social-cards.vercel.app/**.%2Fevents**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
    </Head>
    <EventsPage />
  </>
)

export default Events
