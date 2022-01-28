import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import dayjs from 'dayjs'
import User from '@components/Auth/User'
import Header from '@components/Utils/Header'
import Footer from '@components/Utils/Footer'
import 'dayjs/locale/en-au'
import '@styles/main.css'
import '@styles/chrome-bug.css'

const AddOns = dynamic(() => import('../components/Utils/AddOns'), {
  ssr: false
})

dayjs.locale('en-au')

const Website = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <ClerkProvider>
      <User>
        <ThemeProvider attribute='class'>
          <Header />
          <main id='main' className='main'>
            <Component {...pageProps} />
          </main>
          <Footer />
          {process.env.NODE_ENV === 'production' && <AddOns />}
        </ThemeProvider>
      </User>
    </ClerkProvider>
  )
}

export default Website
