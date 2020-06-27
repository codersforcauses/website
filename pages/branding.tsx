import React from 'react'
import Head from 'next/head'
import BrandPage from 'components/Brand/BrandPage'

const Branding = () => (
  <>
    <Head>
      <title>Branding | Coders for Causes</title>
      <meta
        name='description'
        content='Coders for Causes branding. Looking to use our logos, fonts, or colours for something? Please follow the guidelines laid out.'
      />
      <meta
        property='og:image'
        content='https://og-social-cards.dankestkush.vercel.app/**.%2Fbranding**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fwebsite.codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      <meta property='og:site_name' content='Coders for Causes' />
    </Head>

    <BrandPage />
  </>
)

export default Branding
