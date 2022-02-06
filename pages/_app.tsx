import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import { SWRConfig } from 'swr'
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
    <>
      <ClerkProvider clerkJSVariant='headless' {...pageProps}>
        <SWRConfig
          value={{
            refreshInterval: 5000,
            fetcher: (resource, init) =>
              fetch(resource, init).then(res => res.json())
          }}
        >
          <User>
            <ThemeProvider attribute='class'>
              <Header />
              <main id='main' className='main'>
                <Component {...pageProps} />
              </main>
              <Footer />
            </ThemeProvider>
          </User>
        </SWRConfig>
      </ClerkProvider>
      {process.env.NODE_ENV === 'production' && <AddOns />}
    </>
  )
}

export default Website
