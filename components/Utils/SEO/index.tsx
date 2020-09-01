import React from 'react'

type SEOProps = {
  title: string
  image: string
  description: string
  page?: string
}

const SEO = ({ title, image, description, ...props }: SEOProps) => {
  return (
    <>
      <meta name='description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@codersforcauses' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta
        property='og:url'
        content={`https://codersforcauses.org/${props?.page}`}
      />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:image:width' content='512' />
      <meta property='og:image:height' content='293' />
      <meta property='og:site_name' content='Coders for Causes' />
    </>
  )
}

export default SEO
