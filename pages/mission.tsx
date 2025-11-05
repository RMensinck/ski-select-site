import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../texts/textsMission'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useFirebaseImage } from '../hooks/useFirebaseImage';
import Image from 'next/image';
import Card from '@/components/Card';

declare function gtag(...args: any[]): void;

export default function Home() {
    const router = useRouter()
    const { locale } = router 

    useEffect(() => {
      gtag('event', 'mission loaded')
    }, [])

    return (
      <>
        <Head>
          <title>{texts.header[locale]}</title>
          <meta name="description" content={texts.metaDescription[locale]}/>
        </Head>

        <div className="px-2 lg:py-16"> 
          <Card className="max-w-5xl mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold leading-7 text-accent-color">{texts.mission[locale]}</h2>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">{texts.title[locale]}</h1>
                <p className="mt-6 text-text-muted">{texts.body2[locale]}</p>
                <p className="mt-6 text-text-muted">{texts.body3[locale]}</p>
              </div>
              <div className="md:col-span-1 md:order-first">
                <div className="p-4 max-w-sm">
                  <Image
                    className="rounded-xl lg:rounded-3xl w-full"
                    src="/authors/RemcoMensinck.jpeg"
                    alt="Picture of Remco Mensinck"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

      </>
    )
  }

