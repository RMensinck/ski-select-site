import texts from '../texts/textsNotLoggedIn'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SideBar from './sidebar'


export default function NotLoggedIn() {

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
        <div className="bg-[url('../public/background.svg')] bg-cover w-screen min-h-screen absolute flex flex-col lg:flex-row items-center bg-fixed">
          <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-auto my-10 shadow-lg lg:min-w-[48rem]">
            <div className="grid place-items-center ">
              <h1 className="text-4xl font-bold text-dark-blue mx-3 mb-6 mt-7">
                {texts.welcome[locale]}
              </h1>
              <p>
                {texts.loginPlease[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
  ) 
}