import SideBar from '../components/sidebar';
import Head from 'next/head'
import Link from 'next/link'
import texts from '../components/textsOpinions' 
import { useRouter } from 'next/router'
import skis from '../components/allSkisFrontend.json'

export default function Home() {
    const router = useRouter()
    const { locale } = router
    return (
      <>
        <Head>
          <title>{texts.header[locale]}</title>
        </Head>
        <main className="">
          <div className="flex">
            <SideBar />
            <div className="standard-background">
              <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-3 my-10 shadow-lg lg:min-w-[48rem]">
                <div className="grid place-items-center ">
                  <h1 className="text-4xl font-bold text-dark-blue mx-3 mb-6 mt-7">
                    {texts.title[locale]}
                  </h1>
                  <p className="mb-6 text-dark-blue mx-3 lg:mx-6 text-center">
                    {texts.body[locale]}
                  </p>
                  {skis.map((ski, index) => (
                  <Link href={ski.href} key={index}>
                    <p className="mb-6 text-dark-blue mx-6 text-center underline hover:font-semibold">
                      {ski.name}
                    </p>
                  </Link>
                ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  