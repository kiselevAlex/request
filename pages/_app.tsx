import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line */}
        <script src="/env.js" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
