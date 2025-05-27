// pages/_app.js
import '../styles/globals.css'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
//
