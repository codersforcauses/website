import React from 'react'
import Head from 'next/head'
import HomePage from 'components/Home/HomePage'

const index = () => (
  <>
    <Head>
      <title>Coders for Causes</title>
      <meta
        name='description'
        content='Coders for Causes is a not for profit organisation that empowers charities and other not for profit organisations by connecting them with university students to develop technical solutions. We are a student-run club based in Perth, Western Australia with a wide range of clients. Whether you are looking for technical advice or a long term project, get in touch with us for more information.'
      />
      <meta
        property='og:image'
        content='https://og-social-cards.dankestkush.vercel.app/**.%2FInnovation%20with%20a%20mission**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fwebsite.codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      <meta property='og:title' content='Home' />
      <meta property='og:description' content='Student led not-for-profit technical club at the University of Western Australia.' />
      <meta property='og:site_name' content='Coders for Causes' />
    </Head>
    <HomePage />
  </>
)

export default index
