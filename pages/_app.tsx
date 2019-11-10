import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import '../theme.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { initMessenger } from '../helpers/messenger'

export default class MyApp extends App {
  static async getInitialProps (context: NextAppContext) {
    const { Component, ctx } = context
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  componentDidMount () {
    initMessenger()
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
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
          page_id='700598980115471'
          theme_color='#000000'
        />
      </Container>
    )
  }
}
