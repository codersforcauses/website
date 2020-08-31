import React from 'react'
import Head from 'next/head'
import Seo from 'components/Utils/SEO'
import BrandPage from 'components/Brand/BrandPage'

const Branding = () => (
  <>
    <Head>
      <title>Branding | Coders for Causes</title>
      <Seo
        title='Branding'
        description='Logos, colour schemes, icons and more...'
        image='https://og-social-cards.dankestkush.vercel.app/**.%2Fbranding**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
    </Head>

    <BrandPage />
  </>
)

export default Branding
