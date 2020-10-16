import React from 'react'
import AboutPage from 'components/About/AboutPage'
import Meta from 'components/Utils/Meta'

const About = () => (
  <>
    <Meta
      title='About'
      name='About Us'
      page='about'
      description='A group of students who develop technical solutions for charities and other not for profit organisations.'
      image='https://og-social-cards.vercel.app/**.%2Fabout**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
    >
      <link rel='preconnect' href='https://api.mapbox.com' crossOrigin='' />
      <link rel='dns-prefetch' href='//api.mapbox.com' />

      <link
        rel='preconnect'
        href='https://kit-free.fontawesome.com'
        crossOrigin=''
      />
      <link rel='dns-prefetch' href='//kit-free.fontawesome.com' />
      <script
        src='https://kit.fontawesome.com/249aebb7ef.js'
        crossOrigin='anonymous'
        defer
      />
    </Meta>

    <AboutPage />
  </>
)

export default About
