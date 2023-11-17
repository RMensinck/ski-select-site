import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { initFirebase } from '../firebaseConfig'
import CookieConsent from 'react-cookie-consent'
import CookieText from '../texts/textsCookieBanner'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  initFirebase()
  const router = useRouter()
  const { locale } = router 
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
    <CookieConsent
      location='bottom'
      buttonText={CookieText.accept[locale]}
      cookieName="AcceptCookies"
      style={{ background: "#274c77" }}
      buttonStyle={{ background: "#e7ecef", color: "#4e503b", fontSize: "13px" }}
      expires={150}
    >
      <p className=' text-xs'>{CookieText.main[locale]}</p>
    </CookieConsent>
  </>
  )
}
