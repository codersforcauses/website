import React from 'react'

const SEO = ({ title, image, description, page }: SEOProps) => (
  <>
    <meta name='description' content={description} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:creator' content='@codersforcauses' />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:description' content={description} />
    <meta name='twitter:image' content={image} />
    <meta
      name='twitter:url'
      content={
        page
          ? `https://codersforcauses.org/${page}`
          : 'https://codersforcauses.org'
      }
    />
    <meta property='og:type' content='website' />
    <meta
      property='og:url'
      content={
        page
          ? `https://codersforcauses.org/${page}`
          : 'https://codersforcauses.org'
      }
    />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:image' content={image} />
    <meta property='og:image:width' content='512' />
    <meta property='og:image:height' content='293' />
    <meta property='og:site_name' content='Coders for Causes' />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1, shrink-to-fit=no'
    />
  </>
)

export default SEO

interface SEOProps {
  title: string
  image: string
  description: string
  page?: string
}
