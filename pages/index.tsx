
import texts from '@/texts/textsHome'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

declare function gtag(...args: any[]): void;

export async function getStaticProps() {
  return { props: {} }
}

export default function Example() {
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    gtag('event', 'Home loaded')
  }, [])
  
  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>
      <div className="bg-white h-screen">
        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 sm:pt-14 lg:pt-14 lg:w-full lg:max-w-2xl">
              <svg
                className="absolute inset-y-0 right-8 hidden h-screen w-80 translate-x-1/2 transform fill-white lg:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="0,0 90,0 50,100 0,100" />
              </svg>

              <div className="relative px-6 py-12 sm:py-16 lg:py-16 lg:px-8  lg:pr-0 2xl:py-96 ">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                  <div className="mb-10 flex">
                    <div className="relative rounded-lg sm:rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      {texts.upperTextbox[locale]}{' '}
                      <Link href="/opinions" className="whitespace-nowrap font-semibold text-accent-color">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {texts.readMore[locale]} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {texts.title[locale]}
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {texts.body[locale]}
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      href="/pick-a-ski"
                      className="rounded-md bg-accent-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {texts.startNow[locale]}
                    </Link>
                    <Link href="/mission" className="text-sm font-semibold leading-6 text-gray-900">
                      {texts.readMore[locale]} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              src="/homephoto.jpg"
              alt='A photo of a skier'
              width="2813"
              height="3516"
              layout="responsive"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}
