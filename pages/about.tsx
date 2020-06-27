import React from 'react'
import Head from 'next/head'
import AboutPage from 'components/About/AboutPage'

const About = () => (
  <>
    <Head>
      <title>About | Coders for Causes</title>
      <meta
        name='description'
        content='Coders for Causes is a not for profit organisation that empowers charities and other not for profit organisations by connecting them with university students to develop technical solutions. We are a student-run club based in Perth, Western Australia with a wide range of clients. Whether you are looking for technical advice or a long term project, get in touch with us for more information.'
      />
      <meta
        property='og:image'
        content='https://og-social-cards.dankestkush.vercel.app/**.%2Fabout**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fwebsite.codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
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
    </Head>
    <AboutPage />
  </>
)

export default About
