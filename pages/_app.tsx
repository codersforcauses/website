import React from 'react'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import '../theme.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { initAnalytics } from '../helpers/analytics'
import { initMessenger } from '../helpers/messenger'

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }: AppContext) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  componentDidMount () {
    initAnalytics('2423121134')
    initMessenger()
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Coders for Causes</title>
        </Head>
        <div>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
        <div id='fb-root' />
        <div
          className='fb-customerchat'
          data-theme_color='#000000'
          data-page_id='700598980115471'
          data-logged_in_greeting='Hi there! How can we help you?'
          data-logged_out_greeting='Please log in to chat with us'
        />
      </>
    )
  }
}
