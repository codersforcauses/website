import React from 'react'
import Head from 'next/head'
import Seo from 'components/Utils/SEO'
import HomePage from 'components/Home/HomePage'

const index = () => (
  <>
    <Head>
      <title>Coders for Causes</title>
      <Seo
        title='Home'
        description='Student led not-for-profit technical club at the University of Western Australia.'
        image='https://og-social-cards.vercel.app/**.%2FInnovation%20with%20a%20mission**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
    </Head>
    <HomePage />
  </>
)

export default index
