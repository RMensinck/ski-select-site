import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../components/textsContact' 
import { useRouter } from 'next/router'



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
              <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-auto my-10 shadow-lg lg:min-w-[48rem]">
                <div className="grid place-items-center ">
                  <h1 className="text-4xl font-bold text-dark-blue mx-3 mb-6 mt-7">
                    {texts.title[locale]}
                  </h1>
                  <p className="mb-6 text-dark-blue mx-3">
                    {texts.body[locale]}
                  </p>
                  <p className="text-dark-blue mb-6 mx-3">
                    {texts.email[locale]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  