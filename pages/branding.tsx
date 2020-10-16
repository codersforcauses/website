import React from 'react'
import Meta from 'components/Utils/Meta'
import BrandPage from 'components/Brand/BrandPage'

const Branding = () => (
  <>
    <Meta
      title='Branding'
      page='branding'
      description='Logos, colour schemes, icons and more...'
      image='https://og-social-cards.vercel.app/**.%2Fbranding**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
    />

    <BrandPage />
  </>
)

export default Branding
