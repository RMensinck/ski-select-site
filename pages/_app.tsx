import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { initFirebase } from '../firebaseConfig'
import CookieConsent from 'react-cookie-consent'
import CookieText from '../texts/textsCookieBanner'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Sidebar from '../components/sidebar'

export default function App({ Component, pageProps, router }: AppProps) {
  initFirebase()
  const localeRouter = useRouter()
  const { locale } = localeRouter 

  const generateHreflangTags = () => {
    const currentPath = router.asPath;
    const alternateUrls = {
      en: `https://www.pick-a-ski.com/en${currentPath === "/" ? "" : currentPath}`,
      nl: `https://www.pick-a-ski.com/nl${currentPath === "/" ? "" : currentPath}`,
      ja: `https://www.pick-a-ski.com/ja${currentPath === "/" ? "" : currentPath}`,
      pl: `https://www.pick-a-ski.com/pl${currentPath === "/" ? "" : currentPath}`,
      es: `https://www.pick-a-ski.com/es${currentPath === "/" ? "" : currentPath}`,
      de: `https://www.pick-a-ski.com/de${currentPath === "/" ? "" : currentPath}`,
      fr: `https://www.pick-a-ski.com/fr${currentPath === "/" ? "" : currentPath}`,
      "x-default": `https://www.pick-a-ski.com/en${currentPath === "/" ? "" : currentPath}`,
    };
  
    const canonicalUrl = `https://www.pick-a-ski.com/${locale}${currentPath === "/" ? "" : currentPath}`; 
  
    return (
      <>
        <link key="canonical" rel="canonical" href={canonicalUrl} />
        {Object.entries(alternateUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
      </>
    );
  };
  

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
    <Head>
      <Script dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N39BC53F');
        `,
      }} />
      {generateHreflangTags()}
    </Head>
    <Sidebar />
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
