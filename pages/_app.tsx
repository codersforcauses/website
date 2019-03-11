import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import '../theme.scss'
import Header from '../components/Header'

export default class MyApp extends App {
  static async getInitialProps (context: NextAppContext) {
    const { Component, ctx } = context
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
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
        </div>
      </Container>
    )
  }
}
