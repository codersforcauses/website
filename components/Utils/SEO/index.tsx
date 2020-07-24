import React from 'react'

type SEOProps = {
    title: string,
    image: string,
    description: string
}

const SEO = ({ title, image, description }: SEOProps) => {
  return (
    <>
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content='Coders for Causes' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='description' content={description} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@codersforcauses' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </>
  )
}

export default SEO
