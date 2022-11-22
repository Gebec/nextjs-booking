import Head from 'next/head'

import { Layout } from '../src/components'
import { ContextProvider } from '../src/components'

import '../styles/globals.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <Layout>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </Layout>
    </>
  )
}

export default MyApp
