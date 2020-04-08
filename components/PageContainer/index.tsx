/** @jsx jsx */
import { Global, jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import Head from 'next/head'
import Header from '../Utils/Header'
import Footer from '../Utils/Footer'
import { globalStyle } from './styles'

const PageContainer = ({
  title = 'Coders for Causes',
  ...props
}: {
  title?: String
  theme: Object
  children: Object
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta
        name='description'
        content='Coders for Causes is a not for profit organisation that empowers charities and other not for profit organisations by connecting them with university students to develop technical solutions. We are a student-run club based in Perth, Western Australia with a wide range of clients. Whether you are looking for technical advice or a long term project, get in touch with us for more information.'
      />
      <meta name='author' content='Coders for Causes' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
    </Head>
    <Global styles={globalStyle(props.theme)} />
    <Header />
    <main className='main'>{props.children}</main>
    <Footer />
  </>
)

export default withTheme(PageContainer)
