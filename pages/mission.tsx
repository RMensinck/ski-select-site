import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../components/textsMission'
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
            <div className="bg-[url('../public/background.svg')] bg-cover w-screen 
            min-h-screen absolute flex flex-col justify-center 
            items-center bg-fixed">
              <div className="rounded-xl py-4 bg-opacity-50 bg-grey 
              max-w-3xl my-10 shadow-lg lg:min-w-[48rem] mx-3">
                <div className="grid place-items-center ">
                  <h1 className="text-4xl font-bold text-dark-blue mb-4">
                    {texts.title[locale]}
                  </h1>
                  <p className="mb-6 text-dark-blue mx-6 text-center">
                    {texts.body1[locale]}
                  </p>
                  <p className="mb-6 text-dark-blue mx-6 text-center">
                    {texts.body2[locale]}
                  </p>
                  <p className="mb-6 text-dark-blue mx-6 text-center">
                    {texts.body3[locale]}
                  </p>                
                  <p className="mb-6 text-dark-blue">
                    {texts.signoff[locale]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }