import React, { ReactNode } from 'react'
import Head from 'next/head'

const Meta = ({ title, page, description, image, children }: MetaProps) => {
  const link = page
    ? `https://codersforcauses.org/${page}`
    : 'https://codersforcauses.org'
  return (
    <Head>
      <title>
        {page ? `${page.charAt(0).toUpperCase() + page.slice(1)} | ` : null}
        Coders for Causes
      </title>
      <meta name='description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@codersforcauses' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:url' content={link} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={link} />
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
      {children}
    </Head>
  )
}

export default Meta

interface MetaProps {
  title: string
  image: string
  description: string
  page?: string
  children?: ReactNode
}
