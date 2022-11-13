import type { AppProps } from 'next/app'

import { Layout } from '../src/components/layout/Layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
