import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { initFirebase } from '../firebaseConfig'

export default function App({ Component, pageProps }: AppProps) {
  initFirebase()
  return (
  <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-SFCQQ8FEPR"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SFCQQ8FEPR', {
          page_path: window.location.pathname,
          });
        `,
      }}
    />
    <Component {...pageProps} />
  </>
  )
}
